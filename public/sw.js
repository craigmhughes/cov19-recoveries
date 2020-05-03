/* eslint-disable no-restricted-globals */

let cacheName = "v1";

// Must cache all necessary files in order to work offline.
let filesToCache = [
    "/",
    "/manifest.json",
    "/css/app.css",
    "/js/app.js",
    // Fonts
    "/fonts/questrial-regular.woff2",
    // Models
    "/heart.obj"
];

// On installing the service worker.
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(cacheName)
        .then((cache)=>{
            cache.addAll(filesToCache)
        })
        .then(()=> self.skipWaiting())
        .catch(err=> console.log(err))
    );
});

// On the service worker's activation.
self.addEventListener("activate", e => {
    e.waitUntil(

        // Remove unwanted Caches
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName){
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

// Keywords to cache
const assetsToCache = ["fonts", "images", "icons"];

// Do not cache responses from these paths.
const ignoredReferrers = ["login", "register"]


// Listen for fetch requests.
self.addEventListener("fetch", e => {
    // Loop over Keywords to cache assets which match.
    for(asset of assetsToCache){
        if(e.request.url.includes(asset)){
            return e.respondWith(
                caches.match(e.request).then(res=>{
                    
                    let referrerPath = e.request.referrer.replace("https://","").replace("http://","").split(/\/(.+)/)[1];
                    let requestPath = e.request.url.replace("https://","").replace("http://","").split(/\/(.+)/)[1];

                    return res || caches.open(cacheName).then((cache)=>{
                        // Carry out fetch request and cache response.
                        return fetch(e.request).then(resp => {

                            console.log(referrerPath);
                            console.log(requestPath);

                            // If referrer is not from an online only page, cache the response.
                            if(!ignoredReferrers.includes(referrerPath) && referrerPath !== undefined && !filesToCache.includes(requestPath)){
                                cache.put(e.request, resp.clone());
                            }
                            return resp;

                        }).catch(err=>{
                            console.log(err);
                            return false;
                        });
                    })
                })
                
            );
        }
    }
    
    e.respondWith(
        // If requested fetch is cached, return cached version.
        caches.match(e.request).then( res =>{
            // Uncomment and comment out the line below to block connections.
            // return res || false;
            return res || fetch(e.request).catch(err=>{return false});
        })
    ); 
});