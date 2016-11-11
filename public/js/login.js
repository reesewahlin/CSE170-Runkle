'use strict';
var incor = false;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
});

function validateForm() {
	if (incor) {return false}
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
		var incor = false;

		if(first != "calvin") {
			str += "\tfirst name\n";
			incor = true;
		}
		if(last != "gomez") {
			str += "\tlast name\n";
			incor = true;
		}
		if(email != "cuddlebear23@aol.com") {
			str += "\temail\n";
			incor = true;
		}
		if(password != "password") {
			str += "\tpassword\n";
			incor = true;
		}
		if(incor) {
			alert(str)
		}

	});


}




