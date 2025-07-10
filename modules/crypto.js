// ----- Encryption ----- //

export async function generateRecoveryKey() {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const bytes = new Uint8Array(12); //96 bits of entropy (12 bytes)
    crypto.getRandomValues(bytes);

    let key = '';
    for (let byte of bytes) {
        key += charset[byte % charset.length];
    }

    // If the generated key is shorter than 16 characters, add random characters to reach the required length
    while (key.length < 16) {
        key += charset[Math.floor(Math.random() * charset.length)];
    }

    return key.match(/.{1,4}/g).join('-'); //Split into 4-4-4-4 format
}

async function computeChecksum(data) {
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(data));
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function computeHMAC(key, data) {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        key,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const signature = await crypto.subtle.sign(
        "HMAC",
        keyMaterial,
        encoder.encode(data)
    );
    return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

/**
 * @param {string} data
 * @param {string} password - The Primary Encryption Password
 * @param {string} recoveryKey - The Secondary Encryption Password - Optional
 * @returns {Object}
 */
export async function encrypt(data, password, recoveryKey) {
    if(typeof(password) !== 'string' || password.length === 0) throw customError('No valid Password for Encryption provided', 'NO_ENCRYPTION_PASSWORD');

    const encoder = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const dek = crypto.getRandomValues(new Uint8Array(32)); //Data Encryption Key

    async function deriveKey(secret) {
        const keyMaterial = await crypto.subtle.importKey(
            "raw",
            encoder.encode(secret),
            { name: "PBKDF2" },
            false,
            ["deriveKey"]
        );
        return crypto.subtle.deriveKey(
            { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
            keyMaterial,
            { name: "AES-GCM", length: 256 },
            true,
            ["encrypt", "decrypt"]
        );
    }

    const passwordKey = await deriveKey(password);
    const passwordEncryptedDEK = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, passwordKey, dek);

    let recoveryEncryptedDEK = null;
    if(recoveryKey) {
        if(typeof(recoveryKey) !== 'string') throw customError('Invalid Recovery Key', 'INVALID_RECOVERY_KEY');
        const recoveryKeyKey = await deriveKey(recoveryKey);
        recoveryEncryptedDEK = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, recoveryKeyKey, dek);
    }
    else {
        const randomFakeDEK = crypto.getRandomValues(new Uint8Array(32));
        const fakeEncryptedDEK = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, passwordKey, randomFakeDEK);
        console.log(`Setting to ${fakeEncryptedDEK}`)
        recoveryEncryptedDEK = fakeEncryptedDEK;
    }
    
    const encryptedData = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await crypto.subtle.importKey(
        "raw", dek, { name: "AES-GCM" }, false, ["encrypt"]
    ), encoder.encode(data));


    return {
        encryption: {
            salt: btoa(String.fromCharCode(...salt)),
            iv: btoa(String.fromCharCode(...iv)),
            passwordEncryptedDEK: btoa(String.fromCharCode(...new Uint8Array(passwordEncryptedDEK))),
            recoveryEncryptedDEK: btoa(String.fromCharCode(...new Uint8Array(recoveryEncryptedDEK)))
        },
        hmac: await computeHMAC(dek, await computeChecksum(btoa(String.fromCharCode(...new Uint8Array(encryptedData))))),
        content: btoa(String.fromCharCode(...new Uint8Array(encryptedData)))
    }
}



// ----- Decryption ----- //

export async function decrypt(encryptionInfo, passwordOrRecovery, data, hmac) {
    const { salt, iv, passwordEncryptedDEK, recoveryEncryptedDEK } = encryptionInfo;
    const decoder = new TextDecoder();
    const saltArray = Uint8Array.from(atob(salt), c => c.charCodeAt(0));
    const ivArray = Uint8Array.from(atob(iv), c => c.charCodeAt(0));

    async function deriveKey(secret) {
        const keyMaterial = await crypto.subtle.importKey(
            "raw",
            new TextEncoder().encode(secret),
            { name: "PBKDF2" },
            false,
            ["deriveKey"]
        );
        return crypto.subtle.deriveKey(
            { name: "PBKDF2", salt: saltArray, iterations: 100000, hash: "SHA-256" },
            keyMaterial,
            { name: "AES-GCM", length: 256 },
            true,
            ["decrypt"]
        );
    }

    const userKey = await (deriveKey(passwordOrRecovery));

    async function tryDecrypt(key, data, iv) {
        try {
            return await crypto.subtle.decrypt(
                { name: "AES-GCM", iv },
                key,
                new Uint8Array(atob(data).split("").map(c => c.charCodeAt(0)))
            );
        } catch {
            return null;
        }
    }
    
    let dek =
        await tryDecrypt(userKey, passwordEncryptedDEK, ivArray) ||
        await tryDecrypt(userKey, recoveryEncryptedDEK, ivArray);
    
    if (!dek) {
        throw customError('DEK decryption failed', 'DEK_DECRYPTION_ERROR');
    }    

    if(hmac && await computeHMAC(dek, await computeChecksum(data)) !== hmac) throw customError('HMAC validation failed', 'BAD_HMAC');

    let decryptedData;
    try {
        decryptedData = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: ivArray },
            await crypto.subtle.importKey("raw", dek, { name: "AES-GCM" }, false, ["decrypt"]),
            new Uint8Array(atob(data).split("").map(c => c.charCodeAt(0)))
        )
    }
    catch {
        throw customError('Decryption failed', 'DECRYPTION_ERROR');
    }

    return decoder.decode(decryptedData);
}

function customError(errorMessage, errorCode) {
    const error = new Error(errorMessage);
    error.code = errorCode;

    return error;
}