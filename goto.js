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
var GetDirection = function (coords) {
    this.initMap = function() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: {lat: 41.85, lng: -87.65}
        });
        directionsDisplay.setMap(map);

        calculateAndDisplayRoute(directionsService, directionsDisplay);

        var onChangeHandler = function() {
            calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
    }
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: 'Paris',
    destination: 'Lyon',
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      console.log(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

var checkPlaces = new CheckPlaces();
var getDirection = new GetDirection();
var watchID = navigator.geolocation.watchPosition(function(position) {

    //checkPlaces.initMap(position.coords);
    getDirection.initMap(position.coords);

});
