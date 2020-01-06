//@ts-check
document.addEventListener('DOMContentLoaded', DOMContentLoaded);

function DOMContentLoaded(){
    const body = document.querySelector("body");
    const scene = document.querySelector("a-scene");
    scene.addEventListener("enter-vr", function() {
        console.log("enter-vr");
    });
    scene.addEventListener("exit-vr", function() {
        console.log("exit-vr");
    });
    scene.addEventListener("renderstart", function() {
        console.log("renderstart");
    });
    scene.addEventListener("loaded", function() {
        console.log("loaded");
        console.log([
            scene.behaviors,
            scene.camera,
            scene.canvas,
            scene.isMobile,
            scene.object3D,
            scene.renderer,
            scene.renderStarted,
            // scene.effect,
            scene.systems,
            scene.time,
        ]);
        console.log(scene.is("vr-mode"));
    });
    console.log(scene.hasLoaded);

    body.addEventListener("click", ()=>{
        scene.enterVR();
    });
}