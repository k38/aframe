document.addEventListener('DOMContentLoaded', DOMContentLoaded);

var engines;
var sound;
var bgm;
var engine;

function DOMContentLoaded(){
    initSounds();
    engines = document.querySelectorAll(".engine");
    const path = document.querySelector("#path");
    path.addEventListener("alongpath-trigger-activated", (_)=>{
        const point = _.target["id"];
        // console.log(point);
        switch(point){
            case "p7":
                engineControl("on");
                upBgm();
                setTimeout(_ => {
                    playEngine();
                }, 4000);
                setTimeout(_ => {
                    downBgm();
                }, 6500);
                break;
            case "p12":
            case "p13":
                engineControl("low");
                break;
            case "p1":
                restartBgm();
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

function initSounds() {
    sound = new Howl({
        src: ["sound/sound.mp3"],
        autoplay: true,
        sprite: {
            bgm: [0, 9.1 * 1000, true],
            engine: [11 * 1000, 8.5 * 1000]
        },
    });
    playBgm();
}

function playBgm() {
    if(!sound.playing(bgm)){
        console.log("play");
        bgm = sound.play("bgm");
        sound.volume(0.0001, bgm);
        sound.fade(0.0001, 0.1, 1500, bgm);
    }
}

function restartBgm() {
    console.log("restart");
    if(sound.playing(bgm)){
        sound.fade(0.0001, 0.1, 1500, bgm);
    }
}

function upBgm() {
    console.log("up");
    if(sound.playing(bgm)){
        sound.fade(0.1, 0.4, 500, bgm);
    }
}

function downBgm() {
    console.log("down");
    if(sound.playing(bgm)){
        sound.fade(0.4, 0.0001, 500, bgm);
    }
}

function playEngine() {
    const id = sound.play("engine");
}