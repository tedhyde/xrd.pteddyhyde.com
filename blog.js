TeddyHydeClient.onContribution( function() {
    sayThanks();
    revealContent();
});

function setDisplayById( id, display ) {
    const el = document.getElementById(id); 
    if (el) { el.style.display = display; }
}

function revealContent(){
    setDisplayById("excerpt", "none" );
    setDisplayById("full", "inline-block" );
    setDisplayById("th", "none" );
}

function sayThanks() {
    setDisplayById( "thanks", "inline-block" );
    setTimeout( function() {
	setDisplayById( "thanks", "none" );
    }, 5000 );
}


function showAltMessage() {
    console.log( "Popping popup" );
    $('#personal_ad_popup').popup(
	{ escape: false,
	  blur: false
	}
    );

    setTimeout( function()  {
	console.log( "Hiding popup" );
	$('#personal_ad_popup').popup('hide');
    }, 10*1000 );
	
    // setDisplayById( "myad", "inline-block" );
    // setDisplayById("th", "none" );
    // setTimeout( function() {
    // 	revealContent();
    // 	setDisplayById( "myad", "none" );
    // }, 10*1000 );
    // console.log( "Hmm, you won't contribute, OK" );
}

TeddyHydeClient.onDecline( function() {
    showAltMessage();
    console.log( "Hey, we declined to pay!!!" );
});


TeddyHydeClient.onAlreadyPaid( function() {
    revealContent();
});

TeddyHydeClient.onTx( function( data ) {
    console.log( "Got tx", data );
    TeddyHydeClient.logTx( data );
});

TeddyHydeClient.onLoadFailed( function() {
    console.log( "Failed to load it!!!" );
});
