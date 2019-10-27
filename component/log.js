AFRAME.registerComponent('log', {
    schema: {
        message: { type: "string", default: "Hello, World!" },
        event: { type: "string", default: "" },
    },
    multiple: true,
    init: function() {
        console.log("init");
        // console.log(this.data.message);
        var self = this;
        this.eventHandlerFn = function(){ console.log(self.data.message) };
    },
    update: function(oldData) {
        console.log("update");
        var data = this.data;
        var el = this.el;

        if ( oldData.event && data.event !== oldData.event ) {
            console.log(`update ${oldData.event} != ${data.event}`)
            el.addEventListener(oldData.event, this.eventHandlerFn);
        }

        if ( data.event ) {
            console.log(`update ${data.event}`);
            el.addEventListener(data.event, this.eventHandlerFn);
        } else {
            console.log(`update ${data.event}`);
            console.log(data.message);
        }
    },
    remove: function() {
        console.log("remove");
        var data = this.data;
        var el = this.el;

        if ( data.event ) {
            console.log(`remove ${data.event}`);
            el.removeEventListener(data.event, this.eventHandlerFn);
        }
    },
});