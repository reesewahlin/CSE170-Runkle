'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

 $("#first_input, #last_input, #email_input, #password_input").addClass('animated slideInLeft');
 $("#first_input, #last_input, #email_input, #password_input").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
 	 $("#first_input, #last_input, #email_input, #password_input").removeClass('animated slideInLeft');
 });
}



