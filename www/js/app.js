 document.write("<script type='text/javascript' src='compass.js'> </script>");

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    onDeviceReady: function() {
        document.getElementById("entry").addEventListener('change', onEntryChange, false);
        
        var watchID = navigator.compass.watchHeading(onCompassSuccess, onCompassError, options);

    }
};
var longitude;
var latitude;

var geolocationSuccess = function(position) {
	window.latitude = position.coords.latitude;
	window.longitude = position.coords.longitude;
    alert('Latitude: '+ latitude+ '\n' +
          'Longitude: '+ longitude+ '\n');
    init.update();
};
function geolocationError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition(geolocationSuccess);


init = {
	update : function(){

		$.ajax({
		url: 'http://stealapi.apphb.com/api/BlackSpot/DirectionFromLocation?lat='+window.latitude+'&lng='+window.longitude,
		dataType: 'jsonp',
		contentType: "application/json; charset=utf-8",
		success: function(json) {
			var jsonObject = json;
			console.log(jsonObject);	
			alert("we got the data!!!");
			// onCompassSuccess(jsonObject.Bearing);

			$('[name="api"]').append('<p>'+ jsonObject.Name +'</p>');
			$('[name="api"]').append('<p>'+ jsonObject.Bearing +'</p>');
			$('[name="api"]').append('<p>'+ jsonObject.Count +'</p>');
			// $('[name="api"]').append('<p>'+ jsonObject.Location.Longitude +'</p>');
			// $('[name="api"]').append('<p>'+ jsonObject.Location.Latitude +'</p>');
			// $('[name="api"]').append('<p>'+ jsonObject.Category +'</p>');

		}
	});
			//
	}

};

function onCompassSuccess(heading) {
	alert('Heading: ' + heading.magneticHeading);
    // var element = document.getElementById('heading');
    // element.innerHTML = 'Heading: ' + heading.magneticHeading;
};

function onCompassError(compassError) {
    alert('Compass error: ' + compassError.code);
};

var options = {
    frequency: 3000
}; // Update every 3 seconds



