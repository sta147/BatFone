

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
		url: 'http://stealapi.apphb.com/api/Crime/GetACrimeSomewhereNearLocation?lat='+window.latitude+'&lng='+window.longitude,
		dataType: 'jsonp',
		contentType: "application/json; charset=utf-8",
		success: function(json) {
			var jsonObject = json;
			alert("we got the data!!!");
			console.log(jsonObject);	
			$('[name="api"]').append('<p>'+ jsonObject.Id +'</p>');
			$('[name="api"]').append('<p>'+ jsonObject.PersistentId +'</p>');
			$('[name="api"]').append('<p>'+ jsonObject.Location.Longitude +'</p>');
			$('[name="api"]').append('<p>'+ jsonObject.Location.Latitude +'</p>');
			$('[name="api"]').append('<p>'+ jsonObject.Category +'</p>');

		}
	});
			//
	}

};



