FinneyForClient.onContribution( function() {
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

// $.fn.popup.defaults.pagecontainer = '.container';

function showAltMessage() {
    console.log( "Popping popup" );
    $('#personal_ad_popup').popup(
	{
	    color: 'white',
	    opacity: 1,
	    transition: '0.3s',
	    scrolllock: true
	}
    ).popup('show');

    setTimeout( function()  {
    	console.log( "Hiding popup" );
    	$('#personal_ad_popup').popup('hide');
	setTimeout( revealContent, 1000 );
    }, 15*1000 );
 	
    // setDisplayById( "myad", "inline-block" );
    // setDisplayById("th", "none" );
    // setTimeout( function() {
    // 	revealContent();
    // 	setDisplayById( "myad", "none" );
    // }, 10*1000 );
    // console.log( "Hmm, you won't contribute, OK" );
}

FinneyForClient.onDecline( function() {
    showAltMessage();
    console.log( "Hey, we declined to pay!!!" );
});


FinneyForClient.onAlreadyPaid( function() {
    revealContent();
});

FinneyForClient.onTx( function( data ) {
    console.log( "Got tx", data );
    TeddyHydeClient.logTx( data );
});

FinneyForClient.onLoadFailed( function() {
    console.log( "Failed to load it!!!" );
});
