const CACHE_NAME = 'no-bs-countdown-cache-v1';
const APP_BASE_PATH = '/no-bs-countdown/';

// Helper function to check if a request is within our app's scope
const isRequestInScope = (url) => {
    const requestUrl = new URL(url, self.location.origin);
    return requestUrl.pathname.startsWith(APP_BASE_PATH);
};

// Install event - cache resources
self.addEventListener('install', (_) => {
    self.skipWaiting(); // Force service worker activation
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName); // Delete old caches
                    }
                })
            );
        }).then(() => self.clients.claim()) // Take control of all clients
    );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
    // Only handle requests within our app's scope
    if (!isRequestInScope(event.request.url)) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return the response from cache
                if (response) {
                    return response;
                }

                // Clone the request because it's a one-time use stream
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then((response) => {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response because it's a one-time use stream
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                });
            })
    );
});
