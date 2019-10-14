document.addEventListener('DOMContentLoaded', DOMContentLoaded);

function DOMContentLoaded(){
    console.log("--DOMContentLoaded");
    const yellow = document.getElementById("yellow");
    const group = document.getElementById("group");

    yellow.setAttribute("rotation", {x: 0, y: 45, z: 0});
    group.object3D.rotation.set(
        THREE.Math.degToRad(0),
        THREE.Math.degToRad(45),
        THREE.Math.degToRad(0),
    );
    group.object3D.rotation.y += Math.PI / 6;
}