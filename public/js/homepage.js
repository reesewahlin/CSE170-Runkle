'use strict';
var user;
var school, airport, closest, close;
var whatIsClosest;
var file_path = "From public/js/homepage.js: ";
var airport_details = {
        "link": "/newairport",
        "image": "airplane.png",
        "intro": "INFORMATION FOR",
        "name": "AIRPORT"
    }, school_details = {
        "link": "/newschool",
        "image": "school.png",
        "intro": "INFORMATION FOR",
        "name": "SCHOOL"
    }

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
    $.get('/currentuser', function (currentUser) {
        user = currentUser;
        if (!user) {alert("Please return to the Login screen and login.")}
        if (user.closest.name.includes("Airport")) {
          airport = closest = user.closest;
          school = close = user.close;     
          whatIsClosest = "airport";     
        } else {
          airport = close = user.close;
          school = closest = user.closest;
          whatIsClosest = "school";
        }
        console.log(file_path+"User after get request: "+airport_details['link']);
        populatePage();
    });
})

//order the cards based on whats closest
function populatePage() {
    if (whatIsClosest == "school") {
        //card1
        $(".card1_link").attr("href", school_details['link']);
        $(".card1_image").attr("src", "/images/"+school_details['image']);
        $(".card1_intro").text(school_details['intro']);
        $(".card1_name").text(school_details['name']);

        //card2
        $(".card2_link").attr("href", airport_details['link']);
        $(".card2_image").attr("src", "/images/"+airport_details['image']);
        $(".card2_intro").text(airport_details['intro']);
        $(".card2_name").text(airport_details['name']);
    } else {
        //card1
        $(".card2_link").attr("href", school_details['link']);
        $(".card2_image").attr("src", "/images/"+school_details['image']);
        $(".card2_intro").text(school_details['intro']);
        $(".card2_name").text(school_details['name']);

        //card2
        $(".card1_link").attr("href", airport_details['link']);
        $(".card1_image").attr("src", "/images/"+airport_details['image']);
        $(".card1_intro").text(airport_details['intro']);
        $(".card1_name").text(airport_details['name']);    }
}

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

  var options = [
    {selector: '#scrolly', offset: 450, callback: function(el) {
      Materialize.toast("Tap a card to begin", 2500, 'rounded');
    } }
  ];
   var side_enter1 = [
    {selector: '#row2', offset: 10, callback: function(el) {
    	$('#card_home').show();
    	$('#card_home').addClass('animated slideInLeft');
    } }
  ];
   var side_enter2 = [
    {selector: '#row3', offset: 15, callback: function(el) {
    	$('#card_about').show();
    	$('#card_about').addClass('animated slideInLeft');
    } }
  ];
  Materialize.scrollFire(options);
  Materialize.scrollFire(side_enter1);
  Materialize.scrollFire(side_enter2);
  $('.parallax').parallax();
  $('#modal1').modal();
}








