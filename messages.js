var message = {

    $message : null,

    init : function() {

        this.$message = document.getElementById('message');

        this.$message.addEventListener('submit', message.sendMessage);
    },

    sendMessage : function(e) {
        e.preventDefault();

        var graphitiContent = document.getElementById('textarea').value;
        var message = {
            graphiti : graphitiContent,
            coords   : {
                lat : position.coords.latitude,
                lng : position.coords.longitude
            }
        };

        pubnub.publish(message);
    }

};

document.addEventListener('DOMContentLoaded', function() {
    message.init();
});
