(function () {

  angular
    .module('runkle')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window'];

  function authentication ($http, $window) {

    var saveToken = function (token) {
      $window.localStorage['runkle-token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['runkle-token'];
    };

    logout = function() {
      $window.localStorage.removeItem('runkle-token');
    };

    var isLoggedIn = function() {
	  var token = getToken();
	  var payload;

	  if(token){
	    payload = token.split('.')[1];
	    payload = $window.atob(payload);
	    payload = JSON.parse(payload);

	    return payload.exp > Date.now() / 1000;
	  } else {
	    return false;
	  }
	};

	var currentUser = function() {
	  if(isLoggedIn()){
	    var token = getToken();
	    var payload = token.split('.')[1];
	    payload = $window.atob(payload);
	    payload = JSON.parse(payload);
	    return {
	      first_name: payload.first_name,
	      last_name: payload.last_name,
	      email : payload.email
	    };
	  }
	};

	register = function(user) {
	  return $http.post('/register', user).success(function(data){
	    saveToken(data.token);
	  });
	};

	login = function(user) {
	  return $http.post('/login', user).success(function(data) {
	    saveToken(data.token);
	  });
	};


    return {
      saveToken : saveToken,
      getToken : getToken,
      logout : logout
    };
  }

})();