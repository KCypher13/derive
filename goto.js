var map;


var CheckPlaces = function() {

    this.initMap = function initMap(coordinates) {
        var paris = {lat: coordinates.latitude, lng: coordinates.longitude};

        map = new google.maps.Map(document.getElementById('map'), {
            center: paris,
            zoom: 12
        });

        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: paris,
            radius: 1000,
            types: ['store']
        }, callback);
    }

    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            var str = JSON.stringify(results);

        }
    }
}


ffwdme.initialize({
    routing: 'GraphHopper',
    graphHopper: {
        apiKey: 'c62916b3-35a1-4bac-bd03-ab564755ec0d'
    }
});



ffwdme.on('geoposition:ready', function() {
    var route = new ffwdme.routingService({
        dest: { lat: 48.8530778, lng: 2.36955009 }
    }).fetch();
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

initNavigation();