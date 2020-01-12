//@ts-check
document.addEventListener('DOMContentLoaded', DOMContentLoaded);

function DOMContentLoaded(){
    // const camera2 = document.querySelector("#camera2");
    // setTimeout(()=>{
    //     camera2.setAttribute("camera", "active", true);
    // }, 3000);
}

// AFRAME.registerComponent('rotation-reader', {
//     tick: function () {
//       // `this.el` is the element.
//       // `object3D` is the three.js object.
  
//       // `rotation` is a three.js Euler using radians. `quaternion` also available.
//       console.log(this.el.object3D.rotation);
  
//       // `position` is a three.js Vector3.
//       console.log(this.el.object3D.position);
//     }
//   });

AFRAME.registerComponent('rotation-reader', {
    /**
     * We use IIFE (immediately-invoked function expression) to only allocate one
     * vector or euler and not re-create on every tick to save memory.
     */
    tick: (function () {
      var position = new THREE.Vector3();
      var quaternion = new THREE.Quaternion();
  
      return function () {
        this.el.object3D.getWorldPosition(position);
        this.el.object3D.getWorldQuaternion(quaternion);
        // position and rotation now contain vector and quaternion in world space.
      };
    })
});