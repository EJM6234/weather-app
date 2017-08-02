var weatherApp = {
	request: null,
	getLocation: function() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(pos) {
				let userLat = pos.coords.latitude;
				let userLong = pos.coords.longitude;
				request = new XMLHttpRequest();
				let requestURL = "https://fcc-weather-api.glitch.me/api/current?lon=" + userLong + "&lat=" + userLat;
				request.open('GET', requestURL);
				request.responseType = 'json';
				request.send();
				weatherApp.apiRequest();
			});
		}
	},
	apiRequest: function() {		
		request.onload = function() {
			console.log(request.response);
			let city = request.response.name;
			let temp = request.response.main.temp;
			let weather = request.response.weather[0].main;
			let icon = request.response.weather[0].icon;
			$("#loading").remove();
			$("#weatherBody").append("<h2 id='cityName'>" + city + "</h2>");
			$("#cityName").append("<h3 id='temperature'>" + (Math.round(temp * 9 / 5 + 32)) + "&deg;F</h3>");
			$("#temperature").append("<h3 id='weatherStatus'>" + weather + "</h3>");
			$("#weatherStatus").append("<img src='" + icon + "'>");	
		}	
	},
}


weatherApp.getLocation();
