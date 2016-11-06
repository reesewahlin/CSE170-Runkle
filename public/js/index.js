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
    {selector: '#scrolly', offset: 200, callback: function(el) {
      Materialize.toast("Choose a card to begin", 2500, 'rounded' );
    } }
  ];
  Materialize.scrollFire(options);
  $('.parallax').parallax();
}








