// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function() {
// 	navigator.serviceWorker.register('/sw.js').then(function(registration) {
// 	    // Registration was successful
// 	    console.log('ServiceWorker registration successful with scope: ', registration.scope);
// 	}, function(err) {
// 	    // registration failed :(
// 	    console.log('ServiceWorker registration failed: ', err);
// 	});
//     });
// }

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function(reg) {
    console.log('Service Worker Registered!', reg);

    reg.pushManager.getSubscription().then(function(sub) {
      if (sub === null) {
        // Update UI to ask user to register for Push
        console.log('Not subscribed to push service!');
      } else {
        // We have a subscription, update the database
        console.log('Subscription object: ', sub);
      }
    });
  })
   .catch(function(err) {
    console.log('Service Worker registration failed: ', err);
  });
}


function subscribeUser() {
    if ('serviceWorker' in navigator) {
	navigator.serviceWorker.ready.then(function(reg) {

	    reg.pushManager.subscribe({
		userVisibleOnly: true
	    }).then(function(sub) {
		console.log('Endpoint URL: ', sub.endpoint);
	    }).catch(function(e) {
		if (Notification.permission === 'denied') {
		    console.warn('Permission for notifications was denied');
		} else {
		    console.error('Unable to subscribe to push', e);
		}
	    });
	})
    }
}
