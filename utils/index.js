//@ts-check
document.addEventListener('DOMContentLoaded', DOMContentLoaded);

function DOMContentLoaded(){
    const boxEl = document.querySelector("a-box");
    console.log([
        AFRAME.utils.coordinates.isCoordinate("1 2 3"),
        AFRAME.utils.coordinates.isCoordinate("1 2 3 4"),
        AFRAME.utils.coordinates.isCoordinate("1 2"),
        AFRAME.utils.coordinates.isCoordinate("abc"),
        AFRAME.utils.coordinates.parse("1 2 -3"),
        AFRAME.utils.coordinates.parse("1 2 -3 4"),
        AFRAME.utils.coordinates.parse("1 2"),
        AFRAME.utils.coordinates.stringify({x: 1, y: 2, z: -3}),
        AFRAME.utils.coordinates.stringify({x: 1, y: 2, z: -3, w: 4}),
        AFRAME.utils.coordinates.stringify({x: 1, y: 2}),
        AFRAME.utils.entity.getComponentProperty(boxEl, "geometry.primitive"),
        // AFRAME.utils.entity.getComponentProperty(boxEl, "geometry | primitive", "|"),
        AFRAME.utils.entity.getComponentProperty(boxEl, "geometry"),
        AFRAME.utils.entity.setComponentProperty(boxEl, "geometry.width", 1),
        // AFRAME.utils.entity.setComponentProperty(boxEl, "geometry | height", 2, "|"),
        AFRAME.utils.entity.setComponentProperty(boxEl, "geometry", {depth: 3}),
        AFRAME.utils.styleParser.parse("attribute: color; dur: 5000;"),
        AFRAME.utils.styleParser.stringify({height: 10, width: 5}),
        AFRAME.utils.deepEqual({a:1, b:{c: 3}}, {a:1, b:{c: 3}}),
        AFRAME.utils.deepEqual({a:1, b:{c: 3}}, {a:1, b:{c: 2}}),
        AFRAME.utils.diff({a:1, b:{c: 3}}, {a:1, b:{c: 3}}),
        AFRAME.utils.diff({a:1, b:{c: 3}}, {b:{c: 2}}),
        AFRAME.utils.extend({a: 1}, {b: {c: 2}}),
        AFRAME.utils.extend({a: 1}, {b: {c: 2}}, {d: 3}),
        AFRAME.utils.extend({a: 1}, {a: {c: 2}}, {d: 3}),
        AFRAME.utils.extendDeep({a: 1}, {b: {c: 2}}),
        AFRAME.utils.extendDeep({a: 1}, {b: {c: 2}}, {d: 3}),
        AFRAME.utils.extendDeep({a: 1}, {a: {c: 2}}, {d: 3}),
        AFRAME.utils.device.checkHeadsetConnected(),
        AFRAME.utils.device.isGearVR(),
        AFRAME.utils.device.isOculusGo(),
        AFRAME.utils.device.isMobile(),
        AFRAME.utils.getUrlParameter('testing')
    ]);

    // AFRAME.registerComponent('foo', {
    //     init: function () {
    //         // Set up throttling.
    //         this.throttledFunction = AFRAME.utils.throttle(this.everySecond, 1000, this);
    //     },
    
    //     everySecond: function () {
    //         // Called every second.
    //         console.log("A second passed.");
    //     },
    
    //     tick: function (t, dt) {
    //         this.throttledFunction();  // Called once a second.
    //         console.log("A frame passed.");  // Called every frame.
    //     },
    // });

    AFRAME.registerComponent('foo', {
        init: function () {
            // Set up the tick throttling.
            this.tick = AFRAME.utils.throttleTick(this.tick, 500, this);
        },

        /**
         * Tick function that will be wrapped to be throttled.
         */
        tick: function (t, dt) { }
    });
}
