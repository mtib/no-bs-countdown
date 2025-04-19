// Service worker registration script
(() => {
    // App configuration
    const APP_BASE_PATH = '/no-bs-countdown/';

    // Check if we're in development mode (pnpm start or pnpm dev)
    const isDevelopment = () => {
        // Check for development hostnames or query parameters
        return (
            window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1' ||
            window.location.hostname.includes('.local') ||
            new URLSearchParams(window.location.search).has('dev')
        );
    };

    // Register the service worker
    const registerServiceWorker = () => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                // Register the service worker with the correct path
                // The path is relative to the domain, not the current page
                navigator.serviceWorker.register(`${APP_BASE_PATH}sw.js`, {
                    scope: APP_BASE_PATH
                })
                    .then(registration => {
                        console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    })
                    .catch(error => {
                        console.error('ServiceWorker registration failed: ', error);
                    });
            });
        }
    };

    // Unregister any existing service worker
    const unregisterServiceWorker = async () => {
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.getRegistration(APP_BASE_PATH);
            if (registration) {
                await registration.unregister();
                console.log('ServiceWorker unregistered for development mode');
            }
        }
    };

    // Initialize service worker based on environment
    if (isDevelopment()) {
        console.log('Development mode detected. Service worker disabled.');
        unregisterServiceWorker();
    } else {
        console.log('Production mode detected. Service worker enabled.');
        registerServiceWorker();
    }
})();
