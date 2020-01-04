//@ts-check
document.addEventListener('DOMContentLoaded', DOMContentLoaded);

function DOMContentLoaded(){
}

// AFRAME.registerSystem('my-component', {
//     createComplexObject: function (data) {
//         // Do calculations and stuff with data.
//         return new ComplexObject(data);
//     }
// });

// AFRAME.registerComponent('my-component', {
//     init: function () {
//         this.myObject = null;
//     },

//     update: function () {
//         // Do stuff with `this.data`.
//         this.myObject = this.system.createComplexObject(this.data);
//     }
// });

AFRAME.registerSystem('my-component', {
    init: function () {
        this.entities = [];
    },

    registerMe: function (el) {
        this.entities.push(el);
    },

    unregisterMe: function (el) {
        var index = this.entities.indexOf(el);
        this.entities.splice(index, 1);
    }
});

AFRAME.registerComponent('my-component', {
    init: function () {
        this.system.registerMe(this.el);
    },

    remove: function () {
        this.system.unregisterMe(this.el);
    }
});