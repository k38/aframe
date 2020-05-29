
document.addEventListener('DOMContentLoaded', DOMContentLoaded);

function DOMContentLoaded() {
    patch();
    Game.start(stages);
}

function patch() {
    // aframe-multisrc-component
    // Cannot read property 'addEventListener' of undefined
    AFRAME.components.multisrc.Component.prototype.remove = function () {
        var defaultMaterial = this.el.components.material.material;
        this.el.getObject3D('mesh').material = defaultMaterial;
        this.el.removeEventListener('componentchanged', this.compChange);
        var animationEventsArray = ['animationbegin', 'animationstart', 'animationcomplete', 'animationend'];
        var self = this;
        animationEventsArray.forEach(function (event) {
            // this.el.addEventListener(event, this.materialChangedByAnimation);
            self.el.addEventListener(event, self.materialChangedByAnimation);
        });
        this.reduceMaterialChangedThrottle(200);
    };
}

class Game {
    static stage = 0;
    static count = 0;
    static passing = 0;
    static stages = [];

    static start(stages) {
        this.stages = stages;
        this.setFloorProp();
        this.setTiles(stages[this.stage]);
    }

    static setTiles(data) {
        const field = document.querySelector("#field");
        const tiles = data["tiles"];
        Game.passing = tiles.length;
        tiles.forEach(_ => {
            field.appendChild(Tile.create(_));
        });
    }

    static setFloorProp() {
        const elms = document.querySelectorAll(".floor");
        const attr = {
            shape: "none",
        };
        const main = {
            shape: "box",
            offset: "0 0 -1",
            halfExtents: "10 10 1",
        };
    
        elms.forEach((e) => {
            e.setAttribute("static-body", attr);
            e.setAttribute("shape__main", main);
        });
    }

    static judge() {
        Game.count++;
        // console.log(Game.count, Game.passing);

        if ( Game.count < Game.passing )
            return;
    
        Game.correct();
    }

    static correct() {
        setTimeout(() => {
            const elem = document.querySelector("#soundCorrect");
            elem.components.sound.playSound();
        
            Game.clearField();
        
            Game.stage++;
            if ( Game.stages.length <= Game.stage )
                Game.stage = 0;
            Game.count = 0;
        }, 1000);

        setTimeout(() => {
            Game.setTiles(Game.stages[Game.stage]);
        }, 2000);
    }

    static clearField() {
        const tiles = document.querySelectorAll(".tile");
        tiles.forEach(_ => {
            try {
                _.parentNode.removeChild(_);
            }
            finally{}
        });
    }
}

class Tile {
    static common = {"dynamic-body": {mass: 16}, "mixin": "tile", "class": "tile"};
    static create(attrs) {
        let elem = Util.setAttrs(document.createElement("a-entity"), Tile.common);
        elem = Util.setAttrs(elem, attrs);
        return Tile.setTileEvents(elem);
    }

    static createTileParticle() {
        const elem = document.createElement("a-entity");
        const attr = {
            preset: "dust",
            size: 0.08,
            maxAge: 0.5,
            particleCount: 20,
            maxParticleCount: 20,
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

    static tileClick(e) {
        e.target.setAttribute("mixin", "tile target");
        Tile.addForce(e.target);
        Tile.removeTileEvents(e.target);
        Game.judge();
    }

    static tileCollide(e) {
        if ( e.detail.body.el.getAttribute("class") === "floor" )
            return;

        if ( e.detail.target.el.components.sound__collision )
            e.detail.target.el.components.sound__collision.playSound();

        Tile.removeTileEvents(e.detail.target.el);

        setTimeout((e)=>{
            const r = Util.rotationRadToDeg(e.object3D.rotation);
            if ( Math.abs(r[0]) < 20 ) {
                Tile.setTileEvents(e);
                return;
            }

            Game.judge();
        }, 300, e.detail.target.el);
    }

    static tileCollideSoundonly(e) {
        if ( e.detail.body.el.getAttribute("class") === "floor" )
            return;

        if ( e.detail.target.el.components.sound__collision )
            e.detail.target.el.components.sound__collision.playSound();
    }

    static tileSelect(e) {
        if ( !e.target.components.sound__select )
            return;

        console.log("tileSelect",
            Util.rotationRadToDeg(e.target.object3D.rotation));
        e.target.components.sound__select.playSound();
        const particle = Tile.createTileParticle();
        e.target.appendChild(particle);
        setTimeout((t) => {
            t.removeChild(particle);
        }, 800, e.target, particle);
        // console.log(e.target)
    }

    static addForce(elem) {
        var force = new CANNON.Vec3(0, 0, -26);
        var local = new CANNON.Vec3(0, 0, 0);
        var worldVelocity = elem.body.quaternion.vmult(force);
        elem.body.applyImpulse(worldVelocity, local);
    }

    static setTileEvents(elem) {
        elem.addEventListener("click", Tile.tileClick);
        elem.addEventListener("collide", Tile.tileCollide);
        elem.addEventListener("mouseenter", Tile.tileSelect);
        return elem;
    }

    static removeTileEvents(elem) {
        elem.removeEventListener("collide", Tile.tileCollide);
        elem.removeEventListener("click", Tile.tileClick);
        elem.removeEventListener("mouseenter", Tile.tileSelect);
        return elem;
    }
}

class Util {
    static setAttrs(elem, attrs) {
        Object.keys(attrs).forEach(key => {
            elem.setAttribute(key, attrs[key]);
        });
        return elem;
    }
    static rotationRadToDeg(rotation) {
        return [
            THREE.Math.radToDeg(rotation.x),
            THREE.Math.radToDeg(rotation.y),
            THREE.Math.radToDeg(rotation.z),
        ];
    }
}
