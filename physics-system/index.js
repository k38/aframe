//@ts-check
document.addEventListener('DOMContentLoaded', DOMContentLoaded);

function DOMContentLoaded(){
    const ball = document.querySelector("#ball");
    // const v = new THREE.Vector3(0, 2, -1);
    // const v = new THREE.Vector3(0, 2, -5);
    // const v = new THREE.Vector3(0, 2, -10);
    const v = new THREE.Vector3(0, 2, -20);
    ball.setAttribute("velocity", v);
}
