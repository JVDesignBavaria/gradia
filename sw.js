const CACHE_NAME = 'Version 1.1';
const INFO = {
    get description() {
        return {de:`Dieses Update enthält Fehlerbehebungen${this.features.length < 1 ? `.`:` und führt diese neuen Features ein:`}`, en:`This update provides bug fixes${this.features.length < 1 ? `.`:` and introduces these new features:`}`}
    },
    features: [
        {name:{de:`Tabellen-Sortierung`, en:`Table Sort`}, description:{de:`Die Tabellen können automatisch sortiert werden`, en:`Tables can be sorted automatically`}, version: '1.1'},
        {name:{de:"Update-Historie", en:"Update History"}, description:{de:"Neue Features werden versionsübergreifend angezeigt", en:"New Features are displayed across all versions"}, version: '1.1'},
        {name:{de:`Teilweise Datenlöschung`, en:`Partial Data Deletion`}, description:{de:`Einstellungen oder Noten können unabhängig voneinander gelöscht werden`, en:`Settings and Grades can be deleted independently`}, version: '1.1'},
    ],
    release: new Date('2024-11-22')
};

async function resourcesToCache(resources) {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(resources);
}

self.addEventListener('install', (event) => {
    event.waitUntil(
        resourcesToCache([
            'index.html',
            'style.css',
            'script.js',
            'background.jpg',
            //'/favicon.ico',
            'changelog.json'
        ])
    )
    self.skipWaiting();
    sendMessage({from:'SW', version:CACHE_NAME, info:INFO});
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            // Check for old caches
            const oldCaches = cacheNames.filter(cacheName => cacheName !== CACHE_NAME);
            if (oldCaches.length > 0) {
                sendLogData('updated'); // Send log data only if there are old caches
            }

            // Delete old caches
            return Promise.all(
                oldCaches.map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

function sendMessage(message) {
    const channel = new BroadcastChannel('sw_channel');
    console.log(`sending ${message}`);
    channel.postMessage(message);
}

async function cacheFirst(request) {
    const responseFromCache = await caches.match(request);
    if(responseFromCache) return responseFromCache;

    const responseFromNetwork = await fetch(request);

    const cache = await caches.open(CACHE_NAME);
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
        version: CACHE_NAME,
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