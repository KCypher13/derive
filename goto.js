var map;

var goto = {
    map  : null,
    from : null,

    init : function(coordinates) {
        this.setFrom(coordinates);

        this.map = new google.maps.Map(document.getElementById('map'), {
            center : _this.from,
            zoom   : 12
        });
    },

    setFrom : function(coordinates) {
        this.from = {
            lat : coordinates.latitude,
            lng: coordinates.longitude
        };
    }
};

var _this = goto;

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

/** Directions **/

var actualStep;

function calculateAndDisplayRoute( posStart, posEnd) {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
  directionsService.route({
    origin: posStart,
    destination: posEnd,
    travelMode: google.maps.TravelMode.WALKING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
        var steps = response.routes[0].legs[0].steps
        var isOnTheRoad =  checkIfOnTheRoad(steps);
        startNavigation(steps);

    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}



var checkPosition = function(position){
    var currentLat = position.coords.latitude;
    var currentLng = position.coords.longitude;
};


var initNavigation = function(steps){
    var watchID = navigator.geolocation.getCurrentPosition(function(position){
        calculateAndDisplayRoute({lat:position.coords.latitude, lng:position.coords.longitude}, "place de la bastille, Paris");
    });
}

function checkIfOnTheRoad(steps){

    if(actualStep){
        if(actualStep.lat == steps[1].end_point.lat && actualStep.lng == steps[1].end_point.lng){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        actualStep = {lat:steps[1].end_point.lat(), lgn:steps[1].end_point.lng()};
        return true;
    }
}

function startNavigation(steps){
    console.log(steps);
    var nextWaypointKey = 1;
    navigator.geolocation.watchPosition(function(position){
        var currentLat = position.coords.lat;
        var currentLng = position.coords.lng;
        var nextWaypoint = {lat : steps[nextWaypointKey].end_point.lat(), lng: steps[nextWaypointKey].end_point.lng()};
        if(currentLat>(nextWaypoint.lat-0.0001) && currentLat<(nextWaypoint.lat+0.0001)  && currentLng>(nextWaypoint.lng-0.0001) && currentLng<(nextWaypoint.lng+0.0001)) {
            switch (steps[nextWaypointKey].maneuver){
                case 'turn-left':
                    window.navigator.vibrate(200);
                    break;
                case 'turn-right':
                    window.navigator.vibrate(200,100,200);
                    break;
            }

        }
    });

}

initNavigation();