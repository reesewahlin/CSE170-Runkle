'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

  var options = [
    {selector: '#scrolly', offset: 450, callback: function(el) {
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
  $('.scrollspy').scrollSpy();
  $('#modal0').modal();
  $('#modal1').modal();
  $('#modal2').modal();
  
  }








