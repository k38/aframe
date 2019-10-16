document.addEventListener('DOMContentLoaded', DOMContentLoaded);

function DOMContentLoaded(){
    const extendDeep = AFRAME.utils.extendDeep;
    const meshMixin = AFRAME.primitives.getMeshMixin();
    // AFRAME.registerPrimitive("a-box", extendDeep({}, meshMixin, {
    //     defaultComponents: {
    //         geometry: {primitive: "box"}
    //     },
    //     mappings: {
    //         depth: "geometry.depth",
    //         height: "geometry.height",
    //         width: "geometry.width"
    //     }
    // }));
    AFRAME.registerPrimitive('a-ocean', {
        defaultComponents: {
            ocean: {},
            rotation: {x: -90, y: 0, z: 0}
        },
        mappings: {
            width: 'ocean.width',
            depth: 'ocean.depth',
            density: 'ocean.density',
            color: 'ocean.color',
            opacity: 'ocean.opacity'
        }
    });
}