document.addEventListener('DOMContentLoaded', DOMContentLoaded);

var sound;
var bg;
var camera;

function DOMContentLoaded(){
    // document.querySelector("a-scene").addEventListener("enter-vr", enterVR);
    camera = document.querySelector("#camera");

    sound = new Howl({
        src: ["sound.mp3"],
        autoplay: true,
        sprite: {
            bg: [0, (4*60 + 25) * 1000, true],
            focus: [(4*60 + 29.5) * 1000, 1 * 1000],
            collision: [(4*60 + 34) * 1000, 1 * 1000],
            clear: [(4*60 + 39) * 1000, 2 * 1000],
        },
        onplay: playBg
    });

    playBg();

    const boxes = document.querySelectorAll("a-box");
    boxes.forEach(_ => {
        _.addEventListener("mouseenter", mouseEnter);
    });
}

function mouseEnter(e) {
    console.log(camera.object3D.rotation);
    const r = camera.object3D.rotation;
    // Howler.orientation(r.x, r.y, r.z, 0, 1, 0);
    // Howler.orientation(r.x, -r.z, r.y, 0, 1, 0);
    Howler.orientation(r.x, 0, r.y, 0, 1, 0);
    // Howler.orientation(0, 0, -r.y * 180 / Math.PI, 0, 1, 0);

    const p = e.target.object3D.position;
    const id = sound.play("focus");
    sound.pos(p.x, p.y, p.z, id);
    // sound.pos(p.x, -p.z, p.y, id);
    sound.volume(5, id);
}

function playBg() {
    if(!sound.playing(bg)){
        bg = sound.play("bg");
        // sound.volume(0.2, bg);
        sound.volume(0, bg);
    }
}

// function enterVR(e) {
//     if(!sound.playing(bg)){
//         bg = sound.play("bg");
//         sound.volume(0.2, bg);
//     }
// }