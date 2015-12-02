var watchID = navigator.geolocation.watchPosition(function(position) {
        console.log(position);
        $('.latitude').text(position.coords.latitude);
    }
);