document.addEventListener('DOMContentLoaded', DOMContentLoaded);

function DOMContentLoaded(){
    console.log("--DOMContentLoaded");
    const yellow = document.getElementById("yellow");
    const blue = document.getElementById("blue");

    yellow.setAttribute("position", {x: 0.5, y: 0.1, z: -3});
    console.log(yellow);
    blue.object3D.position.set(-0.5, 0.1, -3);
    console.log(blue);
}