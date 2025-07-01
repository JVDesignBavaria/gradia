import { encrypt, decrypt } from 'cryptojs';


//----- Storage Unit -----//

export const storage = {
    prefix: 'datamanager',
    available: false,
    cloudSync: false,

    templates: {},
    defaults: null,

    init() {
        if(!Array.isArray(storage.defaults)) storage.defaults = Object.keys(storage.templates); //Automatically set defaults
        
        let isNewUser = false;

        try {
            // Check LocalStorage functionality
            const testKey = '__test__';
            localStorage.setItem(testKey, testKey);
            if(localStorage.getItem(testKey) !== testKey) throw new Error("localStorage_altered");
            localStorage.removeItem(testKey);
            storage.available = true;

            let raw = localStorage.getItem(storage.prefix);
            let parsed = null;

            // Handle legacy malformed data
            try {
                parsed = JSON.parse(raw);
            } catch (e) {}

            // Fix case: array of {key, value}
            if (Array.isArray(parsed)) {
                const fixed = {};
                for (const entry of parsed) {
                    if (entry && typeof entry.key === 'string') {
                        fixed[entry.key] = entry.value;
                    }
                }
                localStorage.setItem(storage.prefix, JSON.stringify(fixed));
                parsed = fixed;
            }

            // Fix case: missing prefix, but flat data in localStorage
            if (parsed === null) {
                const migrated = {};
                for (const key of Object.keys(localStorage)) {
                    if (key === storage.prefix || key.startsWith('__')) continue;

                    let value;
                    try {
                        value = JSON.parse(localStorage.getItem(key));
                        if (typeof value === 'object' && value !== null) continue; // skip structured data
                    } catch {
                        value = localStorage.getItem(key); // treat as string
                    }

                    migrated[key] = value;
                    localStorage.removeItem(key);
                }

                localStorage.setItem(storage.prefix, JSON.stringify(migrated));
                parsed = migrated;
                isNewUser = false;
            }

            // Ensure the prefix exists and is a proper object
            if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
                localStorage.setItem(storage.prefix, '{}');
                isNewUser = true;
            }

            // Return storage.defaults or set their templates
            const initialized = {};
            for (const key of storage.defaults || []) {
                initialized[key] = storage.ensure(key);
            }

            return {
                content: initialized,
                persistent: true,
                isNewUser
            };
        }
        catch (e) {
            console.warn(`LocalStorage not available: ${e}`);
            storage.available = false;

            const fallback = {};
            for (const key of storage.defaults || []) {
                fallback[key] = storage.templates[key];
            }

            return {
                content: fallback,
                persistent: false,
                isNewUser: undefined
            };
        }
    },

    // Ensures a value is stored in storage and returns it - falls back to the coherent template
    ensure(key) {
        let value = storage.get(key);
        if(value == null) {
            const fallback = storage.templates[key];
            if(fallback != null) storage.set(key, fallback);
            return fallback;
        }
        return value;
    },

    // Set a value - optionally merge old & new value with type object
    set(key, value, merge = false) {
        if(!storage.available) return false;

        let data = storage._read();

        merge && typeof(value) === 'object' && typeof(data[key]) === 'object' 
            ? data[key] = { ...data[key], ...value } 
            : data[key] = value;
        
        localStorage.setItem(storage.prefix, JSON.stringify(data));
    },

    get(key) {
        if(!storage.available) return null;

        let data = storage._read();
        return data[key];
    },

    has(key) {
        if (!storage.available) return false;
        return storage.get(key) != null;
    },

    remove(key) {
        let data = storage._read();
        if(key in data) {
            delete data[key];
            localStorage.setItem(storage.prefix, JSON.stringify(data));
        }
    },

    // Clear storage section
    clear() {
        if(!storage.available) return;
        localStorage.setItem(storage.prefix, '{}');
    },

    //Return all keys in this storage section
    keys() {
        if(!storage.available) return [];
        return Object.keys(storage._read())
    },

    // Remove this storage section
    removeSection() {
        localStorage.removeItem(storage.prefix);
    },

    _read() {
        try {
            return JSON.parse(localStorage.getItem(storage.prefix)) || {};
        } catch (e) {
            console.warn(`Failed to parse storage: ${e}`);
            return {};
        }
    }    
}


//----- File Handling -----//

export const file = {
    formats: {
        // Example:
        // "datamanager-dtm": { extension: "dtm", encrypted: false, minVersion: "Version 1.0", currVersion: "Version 1.1", fileName: "datamanager-demo" }
        // "datamanager-dtme": { "extension: "dtme", encrypted: true, minVersion: "Version 1.1", currVersion: "Version 1.1", fileName: "datamanager-demo" }
    },
    enforceExtensionMatch: false,

    /**
     * 
     * @param {File} fileRef 
     * @param {string} accessKey 
     * @returns 
     */
    async import(fileRef, accessKey) {
        const reader = new FileReader();

        const rawData = await new Promise((resolve, reject) => {
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e.target.error);
            reader.readAsText(fileRef);
        });

        let parsed;
        try {
            parsed = JSON.parse(rawData);
        }
        catch {
            throw customError('Invalid JSON structure', 'INVALID_JSON');
        }

        file._validate(fileRef, parsed);

        const formatConfig = file.formats[parsed.format];
        if(!formatConfig) throw customError(`Unsupported format: ${parsed.format}`, 'UNSUPPORTED_FORMAT');

        if(formatConfig.minVersion && compareVersion(parsed.version, formatConfig.minVersion) < 0) throw customError(`Unsupported File Version: File format is ${parsed.format}, version is ${parsed.version}, but minimum required is ${formatConfig.minVersion}`, 'UNSUPPORTED_VERSION');

        if(formatConfig.encrypted) {
            const { encryption, hmac, content } = parsed;

            if (!accessKey) throw customError('No key provided', 'NO_KEY');
            if (!encryption || !hmac || typeof content !== 'string') throw customError('Invalid encrypted file structure', 'INVALID_FILE_STRUCTURE');
            
            return await decrypt(encryption, accessKey, content, hmac);
        }

        if(typeof parsed.content !== 'string') throw customError('Invalid encrypted file structure', 'INVALID_FILE_STRUCTURE');
        return parsed.content;
    },

    /**
     * @param {Object} options
     * @param {*} options.data - The File Content
     * @param {string} options.format - The File's Format, declared in file.formats
     * @param {string} [options.fileName] - The File's name - Optional: Can be declared in file.formats
     * @param {Object} [options.encryptParameters] - An Object containing Password & RecoveryKey - Optional: Only needed if format has encrypted: true in file.formats
     * @param {string} [options.encryptParameters.password] - The Password
     * @param {string} [options.encryptParameters.recoveryKey] - The RecoveryKey
     * @param {'download' | 'file' | 'blob' | 'string'} [options.output] - The expected Output
     * @returns {Blob | File | string} - As specified, by default Download & Blob
     */
    async export({ data, format, fileName, encryptParameters = {}, output = 'download' }) {

        let result;
        const formatConfig = file.formats[format];
        if(!fileName) fileName = formatConfig.fileName || format.split('-').shift().toLowerCase();

        const fileContent = {
            format,
            version: formatConfig.currVersion || 'Version 1.0',
            metadata: {created: new Date().toISOString()},
        }

        if(formatConfig.encrypted) {
            const encryptedContent = await encrypt(JSON.stringify(data), encryptParameters.password, encryptParameters.recoveryKey)
            
            result = JSON.stringify({ ...fileContent, ...encryptedContent }, null, 2);
        }
        else result = JSON.stringify({ ...fileContent, content: JSON.stringify(data, null, 2) }, null, 2);

        switch(output) {
            case 'file':
                return new File([result], `${fileName}.${formatConfig.extension}`, { type: `application/vnd.${format}` });
            case 'blob':
                return new Blob([result], { type: `application/vnd.${format}` });
            case 'string':
                return result;
            default:
                return file._download(result, fileName, format);
        }
    },

    _validate(fileRef, parsedData) {
        if (typeof parsedData !== 'object' || typeof parsedData.format !== 'string') {
            throw customError('Missing or invalid format field', 'INVALID_FILE_STRUCTURE');
        }
    
        const format = parsedData.format.toLowerCase();
        if (!(format in file.formats)) throw customError(`Unsupported format: ${format}`, 'UNSUPPORTED_FORMAT');
    
        if (file.enforceExtensionMatch) {
            const fileExt = fileRef.name.split('.').pop().toLowerCase();
            const formatExt = format.split('-').pop().toLowerCase();
    
            if (fileExt !== formatExt) {
                console.warn(`Extension mismatch: file has .${fileExt}, format is ${format}`);
                throw customError('File Extension and File Format differ', 'EXTENSION_FORMAT_MISMATCH');
            }
        }
    },
    
    _download(content, fileName, format) {
        const blob = new Blob([content], { type: `application/vnd.${format}` });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${fileName}.${file.formats[format]?.extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url); //Clean up

        return blob;
    }
}


//----- Utility -----//

function customError(errorMessage, errorCode) {
    const error = new Error(errorMessage);
    error.code = errorCode;

    return error;
}

function compareVersion(v1, v2) {
    const parse = (v) => v?.match(/\d+/g)?.map(Number) || [];
    const s1 = parse(v1);
    const s2 = parse(v2);
    const len = Math.max(s1.length, s2.length);

    for (let i = 0; i < len; i++) {
        const a = s1[i] || 0;
        const b = s2[i] || 0;
        if (a !== b) return a > b ? 1 : -1;
    }
    return 0;
}