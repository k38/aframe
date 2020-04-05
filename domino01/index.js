
document.addEventListener('DOMContentLoaded', DOMContentLoaded);
var stage = 0;
var count = 0;
var passing = 0;

function DOMContentLoaded() {
    setFloorProp();
    setTiles(stages[stage]);
}

function setTiles(data) {
    const field = document.querySelector("#field");
    const common = {"dynamic-body": {mass: 5}, "mixin": "tile", "class": "tile"};
    const individual = data["individual"];
    passing = individual.length;
    individual.forEach(_ => {
        let elem = setAttrs(document.createElement("a-entity"), common);
        elem = setAttrs(elem, _);
        elem.addEventListener("click", tileClick);
        elem.addEventListener("collide", tileCollide);
        elem.addEventListener("mouseenter", tileSelect);
        field.appendChild(elem);
    });
}

function createTileParticle() {
    const elem = document.createElement("a-entity");
    const attr = {
        preset: "dust",
        size: 0.08,
        maxAge: 0.5,
        particleCount: 20,
        maxParticleCount: 100,
        accelerationValue: "0 0 0",
        accelerationSpread: "0 0 0",
        velocityValue: "0 0 0",
        velocitySpread: "1 1 1",
        type: 1,
        positionSpread: "0 0 0",
        color: "#555",
        blending: 1,
        opacity: "0,1,1,1,0",
        enabled: true,
        duration: 0.5,
    };
    elem.setAttribute("particle-system", attr);
    return elem;
}

function tileClick() {
    this.setAttribute("mixin", "tile target");
    addForce(this);
}

function tileCollide(e) {
    if ( e.detail.body.el.getAttribute("class") === "floor" )
        return;

    if ( e.detail.target.el.components.sound__collision )
        e.detail.target.el.components.sound__collision.playSound();

    e.detail.target.el.removeEventListener("collide", tileCollide);
    e.detail.target.el.removeEventListener("click", tileClick);
    e.detail.target.el.removeEventListener("mouseenter", tileSelect);

    count++;
    console.log(count);
    judge();
}

function tileSelect(e) {
    if ( !e.target.components.sound__select )
        return;

    e.target.components.sound__select.playSound();
    const particle = createTileParticle();
    e.target.appendChild(particle);
    setTimeout((t) => {
        t.removeChild(particle);
    }, 800, e.target, particle);
    console.log(e.target)
}

function judge() {
    if ( count < passing )
        return;

    setTimeout(() => {
        const elem = document.querySelector("#soundCorrect");
        elem.components.sound.playSound();
    
        clearField();
    
        stage++;
        if ( stages.length <= stage )
            stage = 0;
        count = 0;
    }, 1000);

    setTimeout(() => {
        setTiles(stages[stage]);
    }, 2000);
}

function clearField() {
    const tiles = document.querySelectorAll(".tile");
    const field = document.querySelector("#field");

    tiles.forEach(_ => {
        field.removeChild(_);
    });
}

function addForce(elem) {
    var force = new CANNON.Vec3(0, 0, -4);
    var local = new CANNON.Vec3(0, 0, 0);
    var worldVelocity = elem.body.quaternion.vmult(force);
    elem.body.applyImpulse(worldVelocity, local);
}

function setAttrs(elem, attrs) {
    Object.keys(attrs).forEach(key => {
        elem.setAttribute(key, attrs[key]);
    });
    return elem;
}

function setFloorProp() {
    const elms = document.querySelectorAll(".floor");
    const attr = {
        shape: "none",
    };
    const main = {
        shape: "box",
        offset: "0 0 -1",
        halfExtents: "5 5 1",
    };

    elms.forEach((e) => {
        e.setAttribute("static-body", attr);
        e.setAttribute("shape__main", main);
    });
}
