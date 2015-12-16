var position = {
    coords :null,

    init: function(){
        navigator.geolocation.watchPosition(position.setPosition)
    },

    setPosition: function(_position){
        console.log(_position);
        position.coords = _position.coords;
    }

}
position.init();
