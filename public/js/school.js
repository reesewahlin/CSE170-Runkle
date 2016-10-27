
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	// add any functionality and listeners you want here
}



function initMap(position) {
    var coordinates = {
    	lat: position.coords.latitude, 
    	lng: position.coords.longitude
    };

    var map = new google.maps.Map(document.getElementById('map'), {
      	zoom: 15,
      	center: coordinates
    });
    var marker = new google.maps.Marker({
      	position: coordinates,
      	map: map
    });
 }

 function getLocation() {
 	console.log("Getting location");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initMap);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}