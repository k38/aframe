var STATUS = {
    power: 0,
    fire: 0,
    cooldown: 0
};
var STAGE = {
    minor: 2,
    star: 3,
    clear: false,
    fail: false,
    killer_sound_interval: null
};
document.addEventListener('DOMContentLoaded', DOMContentLoaded);

class Sound {
    constructor() {
        this.howl = null;
        this.bg = null;
    }
    static init() {
        this.howl = new Howl({
            src: ["sound/8bit.mp3"],
            autoplay: true,
            sprite: {
                bg: [0, 50.8 * 1000, true],
                block_not_break: [52 * 1000, 1 * 1000],
                block_break: [53 * 1000, 1 * 1000],
                hatena_coin: [54 * 1000, 1 * 1000],
                hatena_item: [55 * 1000, 1 * 1000],
                powerup: [56 * 1000, 1 * 1000],
                fire: [57 * 1000, 1 * 1000],
                enemy: [58 * 1000, 1 * 1000],
                bom: [59 * 1000, 1 * 1000],
                game_over: [60 * 1000, 1 * 1000],
                fail: [61 * 1000, 3.5 * 1000],
                clear: [64 * 1000, 2 * 1000]
            },
        });
    }
    static start_bgm () {
        if(!this.howl.playing(this.bg)){
            this.bg = this.howl.play("bg");
            this.howl.volume(0.5, this.bg);
        }
    }
    static stop_bgm () {
        if(this.howl.playing(this.bg)){
            this.howl.stop(this.bg);
        }
    }
    static block_not_break () {
        this.howl.play("block_not_break");
    }

    static block_break () {
        this.howl.play("block_break");
    }
    static hatena_coin () {
        this.howl.play("hatena_coin");
    }
    static hatena_item () {
        this.howl.play("hatena_item");
    }
    static powerup () {
        this.howl.play("powerup");
    }
    static fire () {
        this.howl.play("fire");
    }
    static enemy () {
        this.howl.play("enemy");
    }
    static bom () {
        this.howl.play("bom");
    }
    static game_over () {
        this.howl.play("game_over");
    }
    static fail () {
        this.howl.play("fail");
    }
    static clear () {
        this.howl.play("clear");
    }
}

function DOMContentLoaded(){
    setEvent();
    Sound.init();
    Sound.start_bgm();
}

function round(val, pre) {
    return Math.round(val*pre)/pre;
}

function addForce(elem, x, y, z, a=0, b=0, c=0) {
    var force = new CANNON.Vec3(x, y, z);
    var local = new CANNON.Vec3(a, b, c);
    var worldVelocity = elem.body.quaternion.vmult(force);
    elem.setAttribute("data-force-x", x);
    elem.setAttribute("data-force-y", y);
    elem.setAttribute("data-force-z", z);
    elem.body.applyImpulse(worldVelocity, local);
}

function setEvent() {
    const elems = document.querySelectorAll(".clickable");
    const cam = document.querySelector("a-camera");
    elems.forEach(elem => {
        const scene = document.querySelector("a-scene");
        if ( elem.classList.contains("hatena") ) {
            if ( elem.classList.contains("coin") ) {
                elem.addEventListener("click", _ => {
                    const item = newObj("coin", _.target);
                    item.addEventListener("animationcomplete__height", _ => {
                        item.parentNode.removeChild(item);
                    });
                    scene.appendChild(item);
                    Sound.hatena_coin();
                }, {once: true});
            }
            if ( elem.classList.contains("mushroom") ) {
                elem.addEventListener("click", _ => {
                    const item = newObj("mushroom", _.target);
                    scene.appendChild(item);
                    Sound.hatena_item();
                }, {once: true});
            }
            if ( elem.classList.contains("flower") ) {
                elem.addEventListener("click", _ => {
                    const item = newObj("flower", _.target);
                    scene.appendChild(item);
                    Sound.hatena_item();
                }, {once: true});
            }
            elem.addEventListener("animationcomplete", _ => {
                const block = newObj("empty", _.target);
                scene.appendChild(block);
                _.target.parentNode.removeChild(_.target);
            });
        }

        if ( elem.classList.contains("soft") ) {
            elem.addEventListener("click", _ => {
                if ( STATUS.power == 0 ) {
                    Sound.block_not_break();
                    return;
                }

                _.target.parentNode.removeChild(_.target);
                const pos = [
                    {x: 1, y: -1, z: -1},
                    {x: 1, y: -1, z: 1},
                    {x: 1, y: 1, z: -1},
                    {x: 1, y: 1, z: 1},
                    {x: -1, y: -1, z: -1},
                    {x: -1, y: -1, z: 1},
                    {x: -1, y: 1, z: -1},
                    {x: -1, y: 1, z: 1}
                ];
                for(let i=0; i<8; i++){
                    const base = {
                        object3D: {
                            position: {
                                x: _.target.object3D.position.x - pos[i].x * 0.05,
                                y: _.target.object3D.position.y - pos[i].y * 0.05,
                                z: _.target.object3D.position.z - pos[i].z * 0.05
                            }
                        }
                    };
                    const effect = newObj("softEffect", base);
                    scene.appendChild(effect);
                }
                Sound.block_break();
            });
        }

        if ( elem.classList.contains("kame") || elem.classList.contains("kuri") ) {
            elem.addEventListener("click", _ => {
                if ( STATUS.fire == 0 ) return;
                if ( STATUS.cooldown == 1 ) return;
                STATUS.cooldown = 1;
                const times = 3;
                const span = 300;
                for ( let i=1; i<=times; i++ ){
                    const fireball = newObj("fireball", cam);
                    setTimeout(fireball => {
                        scene.appendChild(fireball);
                    }, span * i - 1, fireball);
                    setTimeout(fireball => {
                        const pow = 4;
                        const rad = cam.object3D.rotation.y;
                        const x = Math.sin(rad) * -1 * pow;
                        const z = Math.cos(rad) * -1 * pow;
                        addForce(fireball, x, 5, z);
                        Sound.fire();
                    }, span * i, fireball);
                }
                setTimeout(_ => {
                    STATUS.cooldown = 0;
                }, span * times);
            });
            elem.addEventListener("collide", _ => {
                if ( !_.detail.body.el.classList.contains("fireball") ) return;
                if ( elem.classList.contains("death") ) return;

                if ( elem.classList.contains("kame") ) STAGE.minor--;
                if ( elem.classList.contains("kuri") ) STAGE.star--;

                elem.classList.add("death");
                elem.removeAttribute("alongpath");
                elem.setAttribute("dynamic-body", {linearDamping: 0.99, angularDamping: 0.99, mass: 10});
                const x = _.detail.body.el.getAttribute("data-force-x");
                const z = _.detail.body.el.getAttribute("data-force-z");
                addForce(elem, x/50, 350, z/50);
                Sound.enemy();
                setTimeout(_ => {
                    _.parentNode.removeChild(_);
                    stageEvent();
                }, 1000, elem);
            });
        }

        if ( elem.classList.contains("flower") || elem.classList.contains("mushroom") ){
            elem.addEventListener("click", _ => {
                powerUp(elem.id);
                elem.removeAttribute("dynamic-body");
                elem.setAttribute("animation__height", `to: ${elem.object3D.position.y + 1.5}; autoplay: true;`);
                elem.setAttribute("animation__rotate", "autoplay: true;");
            }, {once: true});
            elem.addEventListener("animationcomplete__height", _ => {
                setTimeout(_ => {
                    elem.parentNode.removeChild(elem);
                }, 300);
            });
        }
    });
}

function newObj(type, base) {
    const elem = type == "firework" ? document.createElement("a-image") : document.createElement("a-entity");
    const pos = base ? base.object3D.position: null;
    const rot = base && base.object3D.rotation ? base.getAttribute("rotation"): null;
    let inner = null;
    switch(type){
        case "softEffect":
            elem.setAttribute("mixin", "softEffect");
            elem.setAttribute("position", pos);
            elem.setAttribute("dynamic-body", {linearDamping: 0.0001, angularDamping: 0.0001, mass: 50});
            setTimeout(_ => {
                addForce(elem, 0, 350, 0);
            }, 100);
            setTimeout(_ => {
                elem.parentNode.removeChild(elem);
            }, 1800);
            break;
        case "coin":
            const animation__height = {to: pos.y + 2.5};
            elem.setAttribute("mixin", "coin coinEffect");
            elem.setAttribute("animation__height", animation__height);
            elem.setAttribute("position", {x: pos.x, y: pos.y + 1.0, z: pos.z});
            break;
        case "empty":
            elem.setAttribute("mixin", "empty");
            elem.setAttribute("position", {x: pos.x, y: pos.y, z: pos.z});
            break;
        case "fireball":
            elem.setAttribute("mixin", "fireball");
            elem.setAttribute("dynamic-body", {
                shape: "sphere",
                sphereRadius: 0.25,
                linearDamping: 0.00001,
                angularDamping: 0.00001,
                mass: 1
            });
            elem.classList.add("fireball");
            inner = document.createElement("a-entity");
            inner.setAttribute("mixin", "fireballImage");
            inner.setAttribute("rotation", `0 ${rot.y} 0`);
            elem.appendChild(inner);
            break;
        case "firework":
            elem.setAttribute("mixin", "firework");
            break;
        case "mushroom":
        case "flower":
            elem.setAttribute("mixin", "clickable_item");
            elem.setAttribute("position", {x: pos.x, y: pos.y + 0.5, z: pos.z});
            console.log(rot);
            elem.setAttribute("rotation", {x: rot.x, y: rot.y, z: rot.z});
            elem.setAttribute("class", `clickable ${type}`);
            elem.setAttribute("geometry", {primitive: "box"});
            elem.setAttribute("material", {opacity: 0});
            elem.setAttribute("animation__appear", `property: object3D.position.y; to: ${pos.y + 1.0}; dur: 500; delay: 200; easing: easeInOutQuad; loop: 1; dir: normal; autoplay: true;`);

            inner = document.createElement("a-image");
            inner.setAttribute("shadow");
            if ( type == "mushroom" ) {
                inner.setAttribute("src", "#item1");
                inner.setAttribute("transparent", true);
            } else if ( type == "flower" ) {
                inner.setAttribute("material", "shader:gif;src:url(img/m1_i2.gif);");
                inner.setAttribute("gif", "");
            }

            elem.appendChild(inner);

            elem.addEventListener("click", _ => {
                powerUp(type);
                elem.removeAttribute("dynamic-body");
                elem.setAttribute("animation__height", `to: ${elem.object3D.position.y + 1.55}; autoplay: true;`);
                elem.setAttribute("animation__rotate", "autoplay: true;");
            }, {once: true});
            elem.addEventListener("animationcomplete__height", _ => {
                setTimeout(_ => {
                    elem.parentNode.removeChild(elem);
                }, 300);
            });
            if ( type == "mushroom" ) {
                elem.addEventListener("animationcomplete__appear", _ => {
                    elem.setAttribute("dynamic-body", {linearDamping: 0.000001, angularDamping: 0.000001, mass: 5});
                    setTimeout(_ => {
                        addForce(elem, 20, 0, 0);
                    }, 500);
                });
            }
            break;
    }
    return elem;
}

function powerUp(type) {
    console.log(`powerUp ${type}`);
    Sound.powerup();
    switch(type){
        case "mushroom":
            document.querySelector("a-cursor.mushroom").setAttribute("visible", "true");
            STATUS.power = 1;
            break;
        case "flower":
            document.querySelector("a-cursor.flower").setAttribute("visible", "true");
            STATUS.power = 1;
            STATUS.fire = 1;
            break;
    }
}

function stageEvent() {
    if ( STAGE.fail ) { // fail
        stopKiller();
        gameOver();
    } else if ( STAGE.star == 0 ) { // kuri
        if ( STAGE.clear ) return;
        STAGE.clear = true;
        stopKiller();
        setTimeout(_ => {
            gameClear();
        }, 500);
    } else if ( STAGE.minor == 0 ) { // kame
        setKiller();
        setTimeout(_ => {
            setKuri();
        }, 3000);
    }
}

function setKiller() {
    const elems = document.querySelectorAll("[mixin=killer]");
    if ( STAGE.killer_sound_interval !== null ) return;
    elems.forEach(_ => {
        _.setAttribute("animation", {autoplay: true});
        _.setAttribute("visible", "true");
    });
    Sound.bom();
    STAGE.killer_sound_interval = setInterval(_ => { Sound.bom() }, 3000);
    console.log("set", STAGE.killer_sound_interval);
}

function stopKiller() {
    const elems = document.querySelectorAll("[mixin=killer]");
    console.log("clear", STAGE.killer_sound_interval);
    clearInterval(STAGE.killer_sound_interval);
    elems.forEach(_ => {
        _.setAttribute("animation", {autoplay: false});
        _.setAttribute("visible", "false");
    });
}

function setKuri() {
    const paths = [
        {curve: "#kuri_path_1", delay: 500},
        {curve: "#kuri_path_2", delay: 1000},
        {curve: "#kuri_path_3", delay: 1500}
    ];
    const kuris = document.querySelectorAll("[mixin=kuri]");
    for ( let i=0; i<kuris.length; i++ ) {
        kuris[i].setAttribute("alongpath", paths[i]);
        kuris[i].addEventListener("movingended", _ => {
            if ( STAGE.fail )
                return;
            STAGE.fail = true;
            stageEvent();
        });
    }
}

function gameClear() {
    const flag = document.querySelector("[mixin=flag]");
    flag.setAttribute("animation", {autoplay: true});
    Sound.stop_bgm();
    Sound.clear();

    const scene = document.querySelector("a-scene");
    const z = 14;
    const pos = [`0 6 ${z}`, `4 8 ${z}`, `-6 6 ${z}`, `3 2 ${z}`, `-3 3 ${z}`];
    const timing = [300, 600, 900];
    for ( let i=0; i<pos.length ; i++ ) {
        const fw = newObj("firework");
        fw.setAttribute("position", pos[i]);
        setTimeout(_ => {
            scene.appendChild(_);
            Sound.bom();
            setTimeout(_ => {
                _.parentNode.removeChild(_);
            }, 800, _);
        }, (i+1)*900 + 1800, fw);
    }
    setTimeout(_ => {
        document.querySelector("#gameClear").setAttribute("visible", true);
    }, 7000);
}

function gameOver() {
    Sound.stop_bgm();
    Sound.game_over();
    setTimeout(_ => {
        document.querySelector("#gameOver").setAttribute("visible", true);
    }, 200);
    setTimeout(_ => {
        Sound.fail();
    }, 1000);
}