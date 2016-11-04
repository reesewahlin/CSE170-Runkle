//var data = require("../../data.json");
var jsonfile = require('jsonfile')
var file = '/tmp/data.json'
jsonfile.readFile(file, function(err, obj) {
  console.dir(obj)
})


var currentLocation;
var areas = [];
//specify options for querying navigator.GeoLocation for location
var options = {
  	enableHighAccuracy: true,
  	timeout: 10000,
  	maximumAge: 0
};




//first function called when page renders
function initialize() {
	navigator.geolocation.getCurrentPosition(success, error, options);
};


//when navigator.Geolocation works, this is called
function success(pos) {
	currentLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };

	//map connection to HTML
	var resultsMap = new google.maps.Map(
	    document.getElementById("map_canvas"), {
		    center: currentLocation,
		    zoom: 13,
		    mapTypeId: google.maps.MapTypeId.ROADMAP
	    });

	//define requests for finding locations of nearests areas
	var requestAirport = {
	    location: currentLocation,
	    radius: '500',
	    query: 'airport'
	};
	var requestSchool = {
	    location: currentLocation,
	    radius: '500',
	    query: 'university'
	};
    console.log("Current Location: "+currentLocation);

	//find closest instance of areas (AP, School)
	var service = new google.maps.places.PlacesService(resultsMap);
	service.textSearch(requestAirport, callback);
	service.textSearch(requestSchool, callback);

	//save each instance of the nearest location to areas array
	function callback(results, status) {
	    if (status == google.maps.places.PlacesServiceStatus.OK) {
		     var area = {
		     	"name": results[0].name,
		     	"place_id": results[0].place_id,
		     	"location": {
		     		lat: results[0].geometry.location.lat(),
		     		lng: results[0].geometry.location.lng()
		     	},
		     	"distance": 999
		     } 
		     area.distance = calculateDistance(area.location);
		     areas.push( area );
	    }
	}

	console.log(areas);

	$.ajax
    ({
        type: "GET",
        dataType : 'json',
        async: false,
        url: 'http://localhost:3000/save_json.php',		//WARY... may have to change to local file
        data: { data: JSON.stringify(areas) },
        success: function () {alert("Thanks!"); },
        failure: function() {alert("Error!");}
    });



};

//calculate distance between your current position and some location
function calculateDistance(p2) {
	var R = 6371e3; // metres
	var lat1 = currentLocation.lat;
	var lat2 = p2.lat;
	var lon1 = currentLocation.lng;
	var lon2 = p2.lng;
	var φ1 = toRadians(lat1);
	var φ2 = toRadians(lat2);
	var Δφ = toRadians((lat2-lat1));
	var Δλ = toRadians((lon2-lon1));

	var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
	        Math.cos(φ1) * Math.cos(φ2) *
	        Math.sin(Δλ/2) * Math.sin(Δλ/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	var d = R * c;
	return d;
}

//convert degrees to radians
function toRadians(degrees) {
	return degrees * Math.PI / 180;
}

//navigator.geolocation.getLocation error method thrown when if fails
function error(err) {
  	console.warn('ERROR(' + err.code + '): ' + err.message);
};


// When the user clicks on <div>, open the popup
function myFunction() {
    var popup = document.getElementById('myPopup');
    popup.classList.toggle('show');
}

google.maps.event.addDomListener(window, "load", initialize);

