function onCompassSuccess(heading) {
    alert('Heading: ' + heading.magneticHeading);
};

function onCompassError(error) {
    alert('CompassError: ' + error.code);
};

navigator.compass.getCurrentHeading(onCompassSuccess, onCompassError);