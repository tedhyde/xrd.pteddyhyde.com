var CACHE_NAME = 'my-site-cache-v2';

var urlsToCache = [
    '/',
    '/reveal.css',
    '/style.css',
    '/setup.js'
];


function updateSubscriptionOnServer(subscription) {
    // TODO: Send subscription to application server

    const subscriptionJson = document.querySelector('.js-subscription-json');
    const subscriptionDetails =
	  document.querySelector('.js-subscription-details');

    if (subscription) {
	subscriptionJson.textContent = JSON.stringify(subscription);
	subscriptionDetails.classList.remove('is-invisible');
    } else {
	subscriptionDetails.classList.add('is-invisible');
    }
}




self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
	caches.open(CACHE_NAME)
	    .then(function(cache) {
		console.log('Opened cache');
		return cache.addAll(urlsToCache);
	    })
    );
});

self.addEventListener('notificationclose', function(e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
    console.log('Closed notification: ' + primaryKey);
});


// self.addEventListener('notificationclick', function(e) {
//     var notification = e.notification;
//     var primaryKey = notification.data.primaryKey;
//     var action = e.action;

//     if (action === 'close') {
// 	notification.close();
//     } else {
// 	clients.openWindow('http://www.example.com');
// 	notification.close();
//     }
// });

self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const title = 'Push Codelab';
    const options = {
	body: 'Yay it works.',
	icon: 'images/icon.png',
	badge: 'images/badge.png'
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// self.addEventListener('push', function(e) {
//   var options = {
//     body: 'This notification was generated from a push!',
//     icon: 'images/example.png',
//     vibrate: [100, 50, 100],
//     data: {
//       dateOfArrival: Date.now(),
//       primaryKey: '2'
//     },
//     actions: [
//       {action: 'explore', title: 'Explore this new world',
//         icon: 'images/checkmark.png'},
//       {action: 'close', title: 'Close',
//         icon: 'images/xmark.png'},
//     ]
//   };
//   e.waitUntil(
//     self.registration.showNotification('Hello world!', options)
//   );
// });
