var watchID = navigator.geolocation.watchPosition(function(position) {
        console.log(position);
        $('.latitude span').text(position.coords.latitude);
        $('.longitude span').text(position.coords.longitude);
        $('.speed span').text(position.coords.speed);
        $('.heading span').text(position.coords.heading);
        $('.accuracy span').text(position.coords.accuracy);
    }
);