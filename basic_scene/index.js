//@ts-check
document.addEventListener('DOMContentLoaded', DOMContentLoaded);

function DOMContentLoaded() {
    var boxEl = document.querySelector('a-box');
    boxEl.addEventListener('mouseenter', function () {
        boxEl.setAttribute('scale', { x: 2, y: 2, z: 2 });
    });
}