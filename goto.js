var map;


function getLocation(){
    navigator.geolocation.getCurrentPosition(function(position){
        initMap({lat:position.coords.latitude, lng:position.coords.longitude});
    })
}


 function initMap(currentPos) {

    map = new google.maps.Map(document.getElementById('map'), {
        center: currentPos,
        zoom: 12
    });

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: currentPos,
        radius: 1000,
        types: ['restaurant']
    }, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        var str = JSON.stringify(results);
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            
        }
    }
}



ffwdme.initialize({
    routing: 'GraphHopper',
    graphHopper: {
        apiKey: 'c62916b3-35a1-4bac-bd03-ab564755ec0d'
    }
});


ffwdme.on('routecalculation:success', function(response) {
    ffwdme.navigation.setRoute(response.route).start();
});

ffwdme.on('navigation:onroute', function(e) {
    var distance = e.navInfo.distanceToNextDirection;
    console.info('You have ' + distance + ' meters to go!');
    if(distance < 10){
        switch (e.navInfo.nextDirection.turn_type){
            case 'TL':
                window.navigator.vibrate(200);
                break;
            case 'TR':
                window.navigator.vibrate(200,100,200);
                break;
        }
    }
});

