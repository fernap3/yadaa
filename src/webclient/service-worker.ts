const CACHE_NAME = "my-site-cache-v1";
const urlsToCache = [
	"/",
	// "/styles/main.css",
	// "/script/main.js"
];

self.addEventListener("install", evt =>
{
	(<any>evt).waitUntil(
		caches.open(CACHE_NAME)
			.then(cache => {
				return cache.addAll(urlsToCache);
			})
	);
});

self.addEventListener("fetch", evt => {
	(<any>evt).respondWith(
		caches.match((<any>evt).request)
			.then(response => {
				// Cache hit - return response
				if (response) {
					return response;
				}
				return fetch((<any>evt).request);
			})
	);
});
