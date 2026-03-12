const APP_VERSION = 'Version 1.2';

async function resourcesToCache(resources) {
    const cache = await caches.open(APP_VERSION);
    
    // Fetch all resources with `cache: "reload"` and store them in cache
    await Promise.all(resources.map(async (resource) => {
        const response = await fetch(resource, { cache: "reload" }); //Force fresh network fetch
        if (!response.ok) throw new Error(`Failed to fetch ${resource}: ${response.statusText}`);
        await cache.put(resource, response.clone());
    }));
}

self.addEventListener('install', (event) => {
    event.waitUntil(
        resourcesToCache([
            'index.html',
            'style.css',
            'script.js',
            './img/background.jpg',
            '/favicon.ico'
        ])
    )
    self.skipWaiting();
    sendMessage('sw_channel', {from:'SW', version:APP_VERSION});
})

self.addEventListener('activate', (event) => {
    console.log('SW activates');

    event.waitUntil(
        (async () => {
            const cacheNames = await caches.keys();
            const oldCaches = cacheNames.filter(cacheName => cacheName !== APP_VERSION);

            if (oldCaches.length > 0) {
                const current = await updateStore.get('oldVersion');

                if (!current) await updateStore.set('oldVersion', oldCaches[0]);

                await sendLogData('updated');
            }

            await Promise.all(oldCaches.map(cacheName => caches.delete(cacheName)));
        })()
    );
});

function sendMessage(channelName, message) {
    const channel = new BroadcastChannel(channelName);
    console.log(`sending ${JSON.stringify(message)}`);
    channel.postMessage(message);
}

async function cacheFirst(request) {
    const responseFromCache = await caches.match(request);
    if(responseFromCache) return responseFromCache;

    const responseFromNetwork = await fetch(request, {cache: "reload"});

    const cache = await caches.open(APP_VERSION);
    await cache.put(request, responseFromNetwork.clone());

    return responseFromNetwork;
}

self.addEventListener('fetch', (event) => {
    event.respondWith(cacheFirst(event.request));
})




//----- SENDS LOG DATA -----//

async function sendLogData(logType) {
    const versionData = {
        app_name: "gradia",
        version: APP_VERSION,
        new_users: 0,
        standalone_apps: 0,
        updated_apps: 0
    };

    switch(logType) {
        case 'new_user':
            versionData.new_users ++;
            break;
        case 'standalone':
            versionData.standalone_apps ++;
            break;
        case 'updated':
            versionData.updated_apps ++;
            break;
        default:
            return;
    }

    try {
        const response = await fetch('https://logs.jvdesign.workers.dev', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(versionData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Response from worker:', result);
    } 
    catch (error) {
        console.error('Failed to send version data:', error);
    }
}







//----- IDB Wrapper - Temporary until datamanager.js supports IDB -----//

const DB_NAME = 'gradia';
const STORE_NAME = 'update';
const DB_VERSION = 1;

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

const updateStore = {
    async set(key, value) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            tx.objectStore(STORE_NAME).put(value, key);
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => reject(tx.error);
        });
    },

    async get(key) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const request = tx.objectStore(STORE_NAME).get(key);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    async remove(key) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            tx.objectStore(STORE_NAME).delete(key);
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => reject(tx.error);
        });
    }
};