var pubnub = {

    block   : null,
    channel : '_graphiti',

    init : function() {
        console.log(this.channel);

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
        console.log('post !');
        pubnub.block.publish({
            channel : pubnub.channel,
            message : message
        });
    },

    retrieve : function() {
        pubnub.block.history({
            channel  : pubnub.channel,
            callback : function(m) {console.log(m);}
        })
    }

};

pubnub.init();
