const CACHE_NAME = "default-v3.14";
const DYNAMIC_CACHE_NAME = "dynamic-v3.08";
const urls = ["/"];

// install ServiceWorker
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(urls);
    })
  );
});
//listen for notification
self.addEventListener("push", async (e) => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: "./images/logo.png",
  });
});
// activate service worke
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== DYNAMIC_CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// self.addEventListener("fetch", (e) => {
//   if (
//     !e.request.url.includes("http://localhost:5000") &&
//     !e.request.url.includes("https://chatonn.onrender.com")
//   ) {
//     const cacheRes = caches.match(e.request);
//     if (cacheRes) {
//       console.log("found cache");
//       e.respondWith(cacheRes);
//       return;
//     }

//     const fetRes = fetch(e.request);
//     e.respondWith(fetRes);
//     const cache = caches.open(DYNAMIC_CACHE_NAME);
//     cache.put(e.request.url, fetRes.clone());
//     return;
//   }
// });

// const cacheresp = async (e)=>{

// }

// self.addEventListener("fetch", async (e) => {
//   if (
//     !e.request.url.includes("http://localhost:5000") &&
//     !e.request.url.includes("https://chatonn.onrender.com") &&
//     !e.request.url.includes("socket") &&
//     !e.request.url.includes("/friends/getchats/")
//   ) {
//     e.respondWith(
//       caches.match(e.request).then((cacheRes) => {
//         return (
//           cacheRes ||
//           fetch(e.request).then((fetRes) => {
//             return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
//               cache.put(e.request.url, fetRes.clone());
//               return fetRes;
//             });
//           })
//         );
//       })
//     );
//   }
// });
