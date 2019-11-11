//@ts-check
document.addEventListener('DOMContentLoaded', DOMContentLoaded);

function DOMContentLoaded() {
    // AFRAME.registerComponent('foo', {
    //     tick: function () {
    //         this.doSomething();
    //     },

    //     doSomething: (function () {
    //         var helperVector = new THREE.Vector3();
    //         var helperQuaternion = new THREE.Quaternion();

    //         return function () {
    //             helperVector.copy(this.el.object3D.position);
    //             helperQuaternion.copy(this.el.object3D.quaternion);
    //         };
    //     })()
    // });
    // AFRAME.registerComponent('foo', {
    //     init: function() {
    //         console.log("init");
    //     },
    //     tick: function () {
    //         console.log("tick");
    //         var el = this.el;
    //         var rotationTmp = this.rotationTmp = this.rotationTmp || { x: 0, y: 0, z: 0 };
    //         var rotation = el.getAttribute('rotation');
    //         rotationTmp.x = rotation.x + 0.1;
    //         rotationTmp.y = rotation.y + 0.1;
    //         rotationTmp.z = rotation.z + 0.1;
    //         el.setAttribute('rotation', rotationTmp);
    //     }
    // });
}

AFRAME.registerComponent('foo', {
    init: function() {
        console.log("init");
    },
    tick: function () {
        console.log("tick");
        var el = this.el;
        var rotationTmp = this.rotationTmp = this.rotationTmp || { x: 0, y: 0, z: 0 };
        var rotation = el.getAttribute('rotation');
        rotationTmp.x = rotation.x + 0.1;
        rotationTmp.y = rotation.y + 0.1;
        rotationTmp.z = rotation.z + 0.1;
        el.setAttribute('rotation', rotationTmp);
    }
});