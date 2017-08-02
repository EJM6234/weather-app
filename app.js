var weatherApp = {
	stationRequest: null,
	weatherRequest: null,
	coordRequest: null,
	locationRequest: null,
	userLat: 0,
	userLong: 0,
	stationId: 0, 
	getCoords: function() {
		$("#header").append("<div id='loading'><h2>Loading...</h2></div>");
		coordRequest = new XMLHttpRequest();
		let requestURL = "https://ipapi.co/json/"
		coordRequest.open('GET', requestURL);
		coordRequest.responseType = 'json';
		coordRequest.send();
		weatherApp.getStation();
	},
	getStation: function() {
		coordRequest.onload = function() {
			console.log(coordRequest.response);
			userLat = coordRequest.response.latitude;
			userLong = coordRequest.response.longitude;
			stationRequest = new XMLHttpRequest();
			let requestURL = "https://api.weather.gov/points/" + userLat + "," + userLong + "/stations";
			stationRequest.open('GET', requestURL);
			stationRequest.responseType = 'json';
			stationRequest.send();
			weatherApp.getWeather();
		}
	},
	getWeather: function() {		
		stationRequest.onload = function() {
			console.log(stationRequest.response)
			stationId = stationRequest.response.features[0].id;
			weatherRequest = new XMLHttpRequest();
			let requestURL = stationId + "/observations/current"
			console.log(requestURL);
			weatherRequest.open('GET', requestURL);
			weatherRequest.responseType = 'json';
			weatherRequest.send();
			weatherApp.setWeather();
		}
	},
	setWeather: function() {
		weatherRequest.onload = function() {
			console.log(weatherRequest.response);
			let city = stationRequest.response.features[0].properties.name;
			let temp = weatherRequest.response.properties.temperature.value;
			let weather = weatherRequest.response.properties.textDescription;
			let icon = weatherRequest.response.properties.icon;
			$("#loading").remove();
			$("#header").append("<h2 id='cityName'>" + city + "</h2>");
			$("#cityName").append("<h3 id='temperature'>" + (Math.round(temp * 9 / 5 + 32)) + "&deg;F</h3>");
			$("#temperature").append("<h3 id='weatherStatus'>" + weather + "</h3>");
			$("#weatherStatus").append("<img src='" + icon + "'>");	
		}	
	}
}


weatherApp.getCoords();
