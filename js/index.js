document.addEventListener('DOMContentLoaded', DOMContentLoaded);

function DOMContentLoaded(){
    var sceneEl = document.querySelector('a-scene');
    console.log(sceneEl.querySelector("#redBox"));
    console.log(sceneEl.querySelectorAll("a-box"));
    console.log(sceneEl.querySelectorAll("light"));
    console.log(sceneEl.querySelector("#geo").getAttribute("geometry"));
    console.log(sceneEl.querySelector("#geo").getAttribute("rotation"));

    var el = document.createElement('a-entity');

    AFRAME.registerComponent('log', {
        schema: {type: 'string'},
        init: function () {
            var stringToLog = this.data;
            console.log(stringToLog);
        }
    });

    AFRAME.registerComponent('foo', {
        init: function () {
            console.log(this.el.sceneEl);
        }
    });

    AFRAME.registerComponent('query-selector-example', {
        init: function () {
          this.entities = document.querySelectorAll('.box');
        },
        tick: function () {
            // Don't call query selector in here, query beforehand.
            for (let i = 0; i < this.entities.length; i++) {
                // Do something with entities.
            }
        }
    });

    AFRAME.registerComponent('do-something-once-loaded', {
        init: function () {
            // This will be called after the entity has properly attached and loaded.
            console.log('I am ready!');
        }
    });

    var entityEl = document.createElement('a-entity');
    entityEl.setAttribute('do-something-once-loaded', '');
    sceneEl.appendChild(entityEl);

    entityEl.setAttribute("geometry", {
        primitive: "box",
        height: 1,
        width: 1,
        depth: 1,
    });

    entityEl.setAttribute("dynamic-body", {
        shape: "box",
        mass: 1.5,
        linearDamping: 0.005,
    });

    // entityEl.setAttribute("position", {x: 1, y:2, z: -3});
    // entityEl.setAttribute("material", "color", "red");
    // entityEl.setAttribute("light", {light: "#ACC", intensity: 0.75});
    // entityEl.object3D.position.set(1,2,3);
    // entityEl.object3D.position.x += 1;
    entityEl.object3D.position.x = 1;
    entityEl.object3D.position.y = 3;
    entityEl.object3D.position.z = 1;
    // entityEl.object3D.position.multiplyScalar(5);

    entityEl.object3D.rotation.y = THREE.Math.degToRad(45);
    // entityEl.object3D.rotation.divideScalar(2);

    entityEl.object3D.scale.set(1, 1, 1);
    entityEl.object3D.visible = false;
    entityEl.object3D.visible = true;

    // entityEl.setAttribute("geometry", {primitive: "torusKnot", p: 1, q: 3, radiusTubular: 4}, true);
    // entityEl.setAttribute("geometry", {primitive: "torusKnot", p: 1, q: 1, radiusTubular: 1}, true);
    // entityEl.parentNode.removeChild(entityEl);

    var anotherEntityEl = document.createElement("a-entity");
    anotherEntityEl.setAttribute("geometry", {primitive: "box", height: 1, depth: 1, width: 1});
    anotherEntityEl.setAttribute("position", {x: 1, y: 1, z: 1});
    // anotherEntityEl.setAttribute("static-body");
    anotherEntityEl.setAttribute("dynamic-body", {
        shape: "box",
        mass: 1.5,
        linearDamping: 0.005,
    });
    sceneEl.appendChild(anotherEntityEl);
    // entityEl.emit("physicscollided", {collidingEntity: anotherEntityEl}, false);
    // entityEl.emit("collide", {collidingEntity: anotherEntityEl}, false);
    // entityEl.addEventListener("physicscollided", function(event){
    entityEl.addEventListener("collide", function(event){
        console.log("Entity collided with", event.detail.collidingEntity);
    });

    var cameraEl = document.querySelector("[camera]");
    cameraEl.removeAttribute("wasd-controls");
}
