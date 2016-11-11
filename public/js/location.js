
var currentLocation;
var areas = [];
var service;
//specify options for querying navigator.GeoLocation for location
var options = {
  	enableHighAccuracy: true,
  	timeout: 10000,
  	maximumAge: 0
};

//first function called when page renders
function initialize() {
	console.log("calling location");
	navigator.geolocation.getCurrentPosition(success, error, options);
};


function renderHomepage() {
	//post to a new route that logs location and distance data then renders the homepage
	console.log("areas: "+areas);
	res.render('homepage');
}

function calculateDistances(callback) {
	//define requests for finding locations of nearests areas
	var requestAirport = {
	    location: currentLocation,
	    radius: '500',
	    query: 'airport'
	};	
	var requestSchool = {
	    location: currentLocation,
	    radius: '500',
	    query: 'UCSD'
	};

	console.log("about to get places");
	console.log("getting airport");
	service.textSearch(requestAirport, service_callback);
	console.log("getting school");
	service.textSearch(requestSchool, service_callback);
	console.log("finished");
	callback();
}



//when navigator.Geolocation works, this is called
function success(pos) {

	console.log("Entered into location success");
	currentLocation = {
		lat: pos.coords.latitude,
		lng: pos.coords.longitude
	}

	//map connection to HTML
	var resultsMap = new google.maps.Map(
	    document.getElementById("map_canvas"), {
		    center: currentLocation,
		    zoom: 13,
		    mapTypeId: google.maps.MapTypeId.ROADMAP
	    }
	);	
	service = new google.maps.places.PlacesService(resultsMap);

	calculateDistances(renderHomepage);
}



//save each instance of the nearest location to areas array
function service_callback(results, status) {
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
	     console.log(area);
	     areas.push( area );
    }
}

//calculate distance between your current position and some location
function calculateDistance(p2, callback) {
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




google.maps.event.addDomListener(window, "load", initialize);
