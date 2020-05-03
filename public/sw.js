/* eslint-disable no-restricted-globals */

let cacheName = "v1";

// Must cache all necessary files in order to work offline.
let filesToCache = [
    "/",
    "/manifest.json",
    "/static/css/app.css",
    "/static/js/app.js",
    // Fonts
    "/fonts/questrial-regular.woff2",
    // Models
    "/heart.obj",
    // Icons
    "/heart-192.png",
    "/heart-192-ico.png",
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
const assetsToCache = ["js", "css"];


// Listen for fetch requests.
self.addEventListener("fetch", e => {
    // Loop over Keywords to cache assets which match.
    for(let asset of assetsToCache){
        console.log(e.request.url);
        console.log(e.request.url.includes(asset));
        if(e.request.url.includes(asset)){
            return e.respondWith(
                caches.match(e.request).then(res=>{
                    return res || caches.open(cacheName).then((cache)=>{
                        // Carry out fetch request and cache response.
                        return fetch(e.request).then(resp => {

                            cache.put(e.request, resp.clone());
                            
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