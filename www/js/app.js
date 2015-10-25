

var app = {
    // Application Constructor
    initialize: function() {
    	alert("got in initialize");
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
    	alert("got in binding");
        document.addEventListener('deviceready', app.onDeviceReady , false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    onDeviceReady: function() {
    	app.receivedEvent('deviceready');
        // document.getElementById("entry").addEventListener('change', onEntryChange, false);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        alert("got into the receivedEvent function");
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        // console.log('Received Event: ' + id);

        navigator.geolocation.getCurrentPosition(app.geolocationSuccess, app.geolocationError);
		navigator.compass.getCurrentHeading(app.onCompassSuccess, app.onCompassError);
		
    },
	longitude:0, latitude: 0,
	geolocationSuccess: function(position) {
		app.latitude = position.coords.latitude;
		app.longitude = position.coords.longitude;
	    alert('Latitude: '+ app.latitude+ '\n' +
	          'Longitude: '+ app.longitude+ '\n');
	    app.update();
	},
	geolocationError: function(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
	},
	update: function(){

	$.ajax({
	url: 'http://stealapi.apphb.com/api/BlackSpot/DirectionFromLocation?lat='+app.latitude+'&lng='+app.longitude,
	dataType: 'jsonp',
	contentType: "application/json; charset=utf-8",
	success: function(json) {
		var jsonObject = json;
		alert("we got the data!!!");
		console.log(jsonObject);	
		$('[name="api"]').append('<p>'+ jsonObject.Name +'</p>');
		$('[name="api"]').append('<p>'+ jsonObject.Bearing +'</p>');
		$('[name="api"]').append('<p>'+ jsonObject.Count +'</p>');
		// $('[name="api"]').append('<p>'+ jsonObject.Id +'</p>');
		// $('[name="api"]').append('<p>'+ jsonObject.PersistentId +'</p>');
		// $('[name="api"]').append('<p>'+ jsonObject.Location.Longitude +'</p>');
		// $('[name="api"]').append('<p>'+ jsonObject.Location.Latitude +'</p>');
		// $('[name="api"]').append('<p>'+ jsonObject.Category +'</p>');

	}
	});
		//
	},
	onCompassSuccess: function(heading) {
	    alert('Heading: ' + heading.trueHeading);
	},

	onCompassError: function(error) {
	    alert('CompassError: ' + error.code);
	}



};


app.initialize();
// navigator.geolocation.getCurrentPosition(geolocationSuccess);

	// init = {
	// 	update : function(){

	// 		$.ajax({
	// 		url: 'http://stealapi.apphb.com/api/BlackSpot/DirectionFromLocation?lat='+window.latitude+'&lng='+window.longitude,
	// 		dataType: 'jsonp',
	// 		contentType: "application/json; charset=utf-8",
	// 		success: function(json) {
	// 			var jsonObject = json;
	// 			alert("we got the data!!!");
	// 			console.log(jsonObject);	
	// 			$('[name="api"]').append('<p>'+ jsonObject.Name +'</p>');
	// 			$('[name="api"]').append('<p>'+ jsonObject.Bearing +'</p>');
	// 			$('[name="api"]').append('<p>'+ jsonObject.Count +'</p>');
	// 			// $('[name="api"]').append('<p>'+ jsonObject.Id +'</p>');
	// 			// $('[name="api"]').append('<p>'+ jsonObject.PersistentId +'</p>');
	// 			// $('[name="api"]').append('<p>'+ jsonObject.Location.Longitude +'</p>');
	// 			// $('[name="api"]').append('<p>'+ jsonObject.Location.Latitude +'</p>');
	// 			// $('[name="api"]').append('<p>'+ jsonObject.Category +'</p>');

	// 		}
	// 	});
	// 			//
	// 	}

	// };




