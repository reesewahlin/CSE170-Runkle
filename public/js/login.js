'use strict';
var incor = 4;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
});

function validateForm() {
	if (incor!=0) {
		incor=4;
		return false;
	}
	else {return true}
}


/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$("#first_input, #last_input, #email_input, #password_input").
	 	addClass('animated slideInLeft');
	$("#first_input, #last_input, #email_input, #password_input").
	 	one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	 	 	$("#first_input, #last_input, #email_input, #password_input").
	 	 		removeClass('animated slideInLeft');
	});

	$("#button_submit").click(function() {

		var first = $("#first_name").val().toLowerCase();
		var last = $("#last_name").val().toLowerCase();
		var email = $("#email").val().toLowerCase();
		var password = $("#password").val().toLowerCase();

		var str = "The following fields are incorrect\n";

		if(first != "calvin") {
			str += "\tfirst name\n";
		} else {incor--}
		if(last != "gomez") {
			str += "\tlast name\n";
		}else {incor--}
		if(email != "cuddlebear23@aol.com") {
			str += "\temail\n";
		}else {incor--}
		if(password != "password") {
			str += "\tpassword\n";
		}else {incor--}
		if(incor>0) {
			alert(str)
		}
	});


}




