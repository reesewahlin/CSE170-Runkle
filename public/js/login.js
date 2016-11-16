var runkleApp = angular.module('runkle', []);
var options = {
  	enableHighAccuracy: true,
  	timeout: 10000,
  	maximumAge: 0
};
var file_path = "From public/login.js: ";
var currentLocation;
var service;
var airport = {
		name: "",
		place_id: "",
		location: {
			lat: 0,
			lng: 0
		},
		distance: 0
}, school = {
		name: "",
		place_id: "",
		location: {
			lat: 0,
			lng: 0
		},
		distance: 0
}

function mainController($scope, $http, $window) {

	$('#map_canvas').hide();


	$scope.credentials = {
		first_name : "",
		last_name : "",
		email : "",
		password : "",
		closest: {
			name: "",
			place_id: "",
			location: {
				lat: 0,
				lng: 0
			},
			distance: 69
		},
		close: {
			name: "",
			place_id: "",
			location: {
				lat: 0,
				lng: 0
			},
			distance: 69
		}
	};

	function saveLocation() {
		console.log("Entered save location");
		navigator.geolocation.getCurrentPosition(success, error, options);
	}

	saveLocation();

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

	//save each instance of the nearest location to areas array
	function airport_callback(results, status) {
	    if (status == google.maps.places.PlacesServiceStatus.OK) {
		     airport = {
		     	"name": results[0].name,
		     	"place_id": results[0].place_id,
		     	"location": {
		     		lat: results[0].geometry.location.lat(),
		     		lng: results[0].geometry.location.lng()
		     	},
		     	"distance": 4
		     } 
		     airport.distance = calculateDistance(airport.location);
		     console.log(file_path+"airport: "+airport.distance);
	    }
	}
	//save each instance of the nearest location to areas array
	function school_callback(results, status) {
	    if (status == google.maps.places.PlacesServiceStatus.OK) {
		     school = {
		     	"name": results[0].name,
		     	"place_id": results[0].place_id,
		     	"location": {
		     		lat: results[0].geometry.location.lat(),
		     		lng: results[0].geometry.location.lng()
		     	},
		     	"distance": 999
		     } 
		     school.distance = calculateDistance(school.location);
		     console.log(file_path+"school: "+school.distance);
	    }
	}


	function findNearby() {
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

		service.textSearch(requestAirport, airport_callback);
		service.textSearch(requestSchool, school_callback);
	}

	function success(pos) {
		console.log(file_path+"Successfully found current location");
		currentLocation = {
			lat: pos.coords.latitude,
			lng: pos.coords.longitude
		}
		var resultsMap = new google.maps.Map(
	    	document.getElementById("map_canvas"), {
		    	center: currentLocation,
		    	zoom: 13,
		    	mapTypeId: google.maps.MapTypeId.ROADMAP
	    	}
		);	
		service = new google.maps.places.PlacesService(resultsMap);
		findNearby();
	}

	function popCredentials(closest, close) {
		//closest
		$scope.credentials.closest.name = closest.name;
		$scope.credentials.closest.place_id = closest.place_id;
		$scope.credentials.closest.location.lat = closest.location.lat;
		$scope.credentials.closest.location.lng = closest.location.lng;
		$scope.credentials.closest.distance = closest.distance;
		//close
		$scope.credentials.close.name = close.name;
		$scope.credentials.close.place_id = close.place_id;
		$scope.credentials.close.location.lat = close.location.lat;
		$scope.credentials.close.location.lng = close.location.lng;
		$scope.credentials.close.distance = close.distance;
	}



	$scope.onLogin = function() {
		console.log(file_path+"Credentials: \n"+$scope.credentials);

		console.log(file_path+"Deciding whats closer: Airport"+airport.distance+" or school: "+school.distance);

		//populate the closest and close fields of credentials
		if (airport.distance > school.distance) {
			//school closer than airport
			popCredentials(school, airport);
		} else {
			//airport closer than school
			popCredentials(airport, school);
		}

		console.log(file_path+"Credentials after update: \n"+$scope.credentials);


		//save user to db
		$http.post('/register', $scope.credentials)
			.success(function(data) {
				console.log("public/login.js: Successful Register post");

			})
			.error(function (data) {
				console.log('public/login.js: Error: '+data);
			});


		if (airport.distance > school.distance) {
			$window.location.replace('newschool');
		} else {
			$window.location.replace('newairport');
		}

	};
}

