//@ts-check
document.addEventListener('DOMContentLoaded', DOMContentLoaded);

var engines;

function DOMContentLoaded(){
    engines = document.querySelectorAll(".engine");
    const path = document.querySelector("#path");
    path.addEventListener("alongpath-trigger-activated", (_)=>{
        const point = _.target["id"];
        // console.log(point);
        switch(point){
            case "p7":
                engineControl("on");
                break;
            case "p12":
            case "p13":
                engineControl("low");
                break;
            case "p1":
            case "p2":
            case "p14":
            case "p15":
                engineControl("off");
                break;
        }
    });
    path.addEventListener("movingended", (_)=>{
        engineControl("off");
    });
}

function engineControl(sw){
    const param = {"preset":"dust","size":800,"maxAge":1,"particleCount":30,"maxParticleCount":150,"type":1,"color":["#fff"],"blending":1,"positionSpread":{"x":0,"y":0,"z":0},"opacity":["0","0.7","0"],"accelerationValue":{"x":0,"y":-500,"z":500},"accelerationSpread":{"x":1500,"y":1500,"z":1500},"velocityValue":{"x":0,"y":0,"z":0},"velocitySpread":{"x":0,"y":0,"z":0},"enabled":false,"rotationAxis":"x","rotationAngle":3.14,"rotationAngleSpread":0,"dragValue":0,"dragSpread":0,"dragRandomise":false,"direction":1,"duration":null,"texture":"https://cdn.rawgit.com/IdeaSpaceVR/aframe-particle-system-component/master/dist/images/smokeparticle.png","randomise":false};
    switch(sw){
        case "on":
            param["enabled"] = true;
            param["opacity"] = ["0","0.5","0"];
            break;
        case "low":
            param["enabled"] = true;
            param["opacity"] = ["0","0.1","0"];
            break;
        case "off":
            param["enabled"] = false;
            param["opacity"] = ["0","0.5","0"];
            break;
    }
    engines.forEach(_ => {
        _.setAttribute("particle-system", param);
    });
}