var watchID = null;
function bindEvents() {
        alert('I m a bnding...:');
        document.addEventListener('deviceready', function(){alert("OOOOOOO")}, true);
    }
var app = {
    // Application Constructor
    initialize: function() {
        bindEvents();
        alert('I have statrted...:');
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    onDeviceReady: function() {
        alert('I am ready..:');

        document.getElementById("entry").addEventListener('change', onEntryChange, false);

        navigator.geolocation.getCurrentPosition(app.geolocationSuccess, app,geolocationError);
    }
};
var longitude;
var latitude;

app.geolocationSuccess = function(position) {
	window.latitude = position.coords.latitude;
	window.longitude = position.coords.longitude;
    alert('Latitude: '+ latitude+ '\n' +
          'Longitude: '+ longitude+ '\n');
    app.init().update();
};
app,geolocationError = function geolocationError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}



app.init = function init(){
	update : function update(){
		alert("watchHeading");
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

		},
		error: function(json) {
			alert("Error occurred whilst getting data.");
		}
	});
			//
	}

};


	var onCompassSuccess = function(heading) {
		alert('Heading: ' + heading.magneticHeading);
	    // var element = document.getElementById('heading');
	    // element.innerHTML = 'Heading: ' + heading.magneticHeading;
	};

	 var onCompassError = function(compassError) {
	    alert('Compass error: ' + compassError.code);
	};

	var options = {
		frequency: 3000
	}; // Update every 3 seconds



app.startWatch = function(){
		if (null == window.watchID){
			 var watchID = navigator.compass.watchHeading(onCompassSuccess, onCompassError, options);
			};
};

