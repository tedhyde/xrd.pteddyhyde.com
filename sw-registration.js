const applicationServerPublicKey = 'BGrr3XEuEdfMPRbzYRBtmWVl-WjLu-nNT9M1KBtFbGwxZ6sSHYqo4BP2McEXXOJkJVSoiCdBKGkUTxg0jzLf4xg';

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


function updateSubscriptionOnServer(subscription) {
    // TODO: Send subscription to application server
    // const subscriptionJson = document.querySelector('.js-subscription-json');
    // const subscriptionDetails =
    // 	  document.querySelector('.js-subscription-details');

    // if (subscription) {
    // 	subscriptionJson.textContent = JSON.stringify(subscription);
    // 	subscriptionDetails.classList.remove('is-invisible');
    // } else {
    // 	subscriptionDetails.classList.add('is-invisible');
    // }
}


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(reg) {
	console.log('Service Worker Registered!', reg);
	
	reg.pushManager.getSubscription().then(function(subscription) {

	    isSubscribed = !(subscription === null);

	    updateSubscriptionOnServer(subscription);

	    if (isSubscribed) {
		console.log('User IS subscribed.');
	    } else {
		console.log('User is NOT subscribed.');
	    }
	});
    })
	.catch(function(err) {
	    console.log('Service Worker registration failed: ', err);
	});
}

function initialiseUI() {

    pushButton.addEventListener('click', function() {
	pushButton.disabled = true;
	if (isSubscribed) {
	    // TODO: Unsubscribe user
	} else {
	    subscribeUser();
	}
    });
    
    // Set the initial subscription value
    swRegistration.pushManager.getSubscription()
	.then(function(subscription) {
	    isSubscribed = !(subscription === null);

	    TeddyHydeClient.registerOnServer(subscription);
	    
	    if (isSubscribed) {
		console.log('User IS subscribed.');
	    } else {
		console.log('User is NOT subscribed.');
	    }

	    updateBtn();
	});
}

// function subscribeUser() {
//     if ('serviceWorker' in navigator) {
// 	navigator.serviceWorker.ready.then(function(reg) {
	    
// 	    reg.pushManager.subscribe({
// 		userVisibleOnly: true
// 	    }).then(function(sub) {
// 		console.log('Endpoint URL: ', sub.endpoint);
// 	    }).catch(function(e) {
// 		if (Notification.permission === 'denied') {
// 		    console.warn('Permission for notifications was denied');
// 		} else {
// 		    console.error('Unable to subscribe to push', e);
// 		}
// 	    });
// 	})
//     }
// }


function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
          .replace(/\-/g, '+')
          .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
	outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
	userVisibleOnly: true,
	applicationServerKey: applicationServerKey
    })
	.then(function(subscription) {
	    console.log('User is subscribed.');

	    updateSubscriptionOnServer(subscription);

	    isSubscribed = true;

	    updateBtn();
	})
	.catch(function(err) {
	    console.log('Failed to subscribe the user: ', err);
	    updateBtn();
	});
}


function updateBtn() {
    if (isSubscribed) {
	pushButton.textContent = 'Disable Push Messaging';
    } else {
	pushButton.textContent = 'Enable Push Messaging';
    }

    pushButton.disabled = false;
}

