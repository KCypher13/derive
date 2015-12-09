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
var GetDirection = function () {
    this.initMap = function(posStart, posEnd) {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: {lat: 41.85, lng: -87.65}
        });
        directionsDisplay.setMap(map);

        calculateAndDisplayRoute(directionsService, directionsDisplay, posStart, posEnd);

        /*var onChangeHandler = function() {
            calculateAndDisplayRoute(directionsService, directionsDisplay);
        };*/
    }
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, posStart, posEnd) {
    console.log(posStart);
  directionsService.route({
    origin: posStart,
    destination: posEnd,
    travelMode: google.maps.TravelMode.WALKING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      console.log(response);
        console.log(response.routes[0].legs[0].steps[1].start_location.lat())
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

//var watchID = navigator.geolocation.watchPosition(checkPosition(position));

//var checkPlaces = new CheckPlaces();
/*var getDirection = new GetDirection();
var watchID = navigator.geolocation.watchPosition(function(position) {

    //checkPlaces.initMap(position.coords);
    getDirection.initMap(position.coords);

});*/

var checkPosition = function(position){
    var currentLat = position.coords.latitude;
    var currentLng = position.coords.longitude;
}


var init = function(){
    navigator.geolocation.getCurrentPosition(function(position){
        var getDirection = new GetDirection();
        getDirection.initMap({lat:position.coords.latitude, lng:position.coords.longitude}, "place de la bastille, Paris");
    })
}

init();