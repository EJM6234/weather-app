var weatherApp = {
	userLat: 0,
	userLong: 0,
	request: null,
	requestURL: "",
	city: null,
	temp: 0,
	weather: null,
	getLocation: function() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(pos) {
				userLat = pos.coords.latitude;
				userLong = pos.coords.longitude;
				weatherApp.apiRequest();
			});
		}
	},
	apiRequest: function() {
		request = new XMLHttpRequest();
		requestURL = "https://fcc-weather-api.glitch.me/api/current?lon=" + userLong + "&lat=" + userLat;
		request.open('GET', requestURL);
		request.responseType = 'json';
		request.send();
		request.onload = function(res) {
			console.log(request.response);
			city = request.response.name;
			temp = request.response.main.temp;
			weather = request.response.weather[0].main;
			icon = request.response.weather[0].icon;
		}		
	},
	displayWeather: function() {
		$(document).on("click", window, function() {
			$("#weatherBody").append("<h2 id='cityName'>" + city + "</h2>");
			$("#cityName").append("<h3 id='temperature'>" + Math.round(temp) + "&deg;C</h3>");
			$("#temperature").append("<h3 id='weatherStatus'>" + weather + "</h3>");
			$("#weatherStatus").append("<img src='" + icon + "'>");
		})
	}
}

weatherApp.getLocation();
weatherApp.displayWeather();
