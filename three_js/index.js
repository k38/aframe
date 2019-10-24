//@ts-check
// import AFRAME from "../node_modules/@types/aframe";

document.addEventListener('DOMContentLoaded', DOMContentLoaded);

function DOMContentLoaded(){
    // console.log(THREE);
    // console.log(document.querySelector('a-entity').sceneEl.object3D);
    // console.log(document.querySelector('a-scene').object3D);

    // var entityEl = document.querySelector('a-entity');
    // console.log(entityEl.object3DMap);
    // console.log(entityEl.getObject3D("mesh"));
    // console.log(entityEl.getObject3D("light").el);

    // AFRAME.registerComponent('foo', {
    //     init: function () {
    //         // var scene = this.el.sceneEl.object3D;  // THREE.Scene
    //     }
    // });

    // AFRAME.registerComponent('pointlight', {
    //     init: function () {
    //         this.el.setObject3D('light', new THREE.PointLight());
    //     },
    //     remove: function () {
    //         this.el.removeObject3D('light');
    //     }
    // });

    // setTimeout(()=>{
    //     console.log("removed");
    //     entityEl.parentNode.removeChild(entityEl);
    // }, 3000);
    // var entityEl = document.querySelector('a-entity');

    var barEl = document.querySelector('#bar');
    var fooEl = document.querySelector('#foo');
    // console.log(barEl.object3D.getWorldPosition(new THREE.Vector3()));
    // console.log(barEl.object3D.getWorldPosition(new THREE.Vector3(0, 0, 0)));
    console.log(fooEl.object3D.getWorldPosition(new THREE.Vector3(0, 0, 0)));
    // console.log(barEl.object3D.getWorldQuaternion(new THREE.Quaternion()));

    console.log(barEl.object3D.getWorldPosition(new THREE.Vector3(0, 0, 0)));
    var worldToLocal = new THREE.Matrix4().getInverse(fooEl.object3D.matrixWorld);
    barEl.object3D.applyMatrix(worldToLocal);
    console.log(barEl.object3D.getWorldPosition(new THREE.Vector3(0, 0, 0)));
}
