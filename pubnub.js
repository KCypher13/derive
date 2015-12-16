var pubnub = {

    block   : null,
    channel : '__graphiti',

    init : function() {
        // Création du block pubnub
        this.block = PUBNUB.init({
            publish_key   : 'pub-c-96312819-5c80-4412-b383-30fa546c219b',
            subscribe_key : 'sub-c-ce0cd012-a3da-11e5-9196-02ee2ddab7fe'
        });

        // Subsciption au channel
        this.block.subscribe({
            channel : pubnub.channel,
            message : function(m) {console.log(m)}
        });

        this.retrieve();
    },

    publish : function(message) {
        pubnub.block.publish({
            channel : pubnub.channel,
            message : message
        });
    },

    retrieve : function() {
        pubnub.block.history({
            channel  : pubnub.channel,
            callback : function(m) {
                localforage.setItem('graphiti', m[0]);
            }
        })
    }

};

pubnub.init();
