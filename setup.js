var iframe;

function setup() {
    iframe = document.getElementById( "th" ).contentWindow;
    window.addEventListener( 'message', receiveMessage );
}

function receiveMessage( event ){
    if (event.origin === "https://www.teddyhyde.com") {
	setDisplayPs( "inline-block" );
	document.getElementById("th").style.display = "none";
    }
    else {
	console.log( "Origin", event.origin );
    }
}

function setDisplayPs( value ) {
    const ps = document.getElementsByTagName("p");
    for( var i = 1; i < ps.length; i++ ) {
	var p = ps[i];
	p.style.display = value;
    }
}

window.onload = function(e) {
    setup();
}
