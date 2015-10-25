

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

init = {
	update : function(){
		$.ajax({
		url: 'http://stealapi.apphb.com/api/Crime/GetARandomCrime',
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

