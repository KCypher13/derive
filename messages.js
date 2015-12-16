var message = {

    $form     : null,
    $textarea : null,
    $showForm : null,

    init : function() {
        this.$showForm = $('.show-message');
        this.$form     = $('#message');
        this.$textarea = this.$form.find('textarea');

        this.$form.on('submit', message.sendMessage);
        this.$showForm.on('click', message.toggleForm);
    },

    sendMessage : function(e) {
        e.preventDefault();

        var graphitiContent = message.$textarea.val();
        var messageContent = {
            graphiti : graphitiContent,
            coords   : {
                lat : position.coords.latitude,
                lng : position.coords.longitude
            }
        };

        pubnub.publish(messageContent);
        message.$form.toggle();
    },

    toggleForm : function() {
        message.$form.toggle();
        message.$textarea.focus();
    }

};

document.addEventListener('DOMContentLoaded', function() {
    message.init();
});
