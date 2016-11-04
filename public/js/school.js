//var data = require("../../data.json")


var currentLocation;
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
  currentLocation = { lat: pos.coords.latitude, 
                      lng: pos.coords.longitude };

  //map connection to HTML
  var resultsMap = new google.maps.Map(
      document.getElementById("map_canvas"), {
        center: currentLocation,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

  var marker = new google.maps.Marker({
          position: currentLocation,
          map: resultsMap,
          title: 'You!'
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

};

//navigator.geolocation.getLocation error method thrown when if fails
function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
};


google.maps.event.addDomListener(window, "load", initialize);

