//@ts-check
document.addEventListener('DOMContentLoaded', DOMContentLoaded);

function DOMContentLoaded() {
    setTimeout(()=>{
        const boxFoo = document.querySelector("a-box").components.foo;
        boxFoo.qux();
    }, 3000);
}

AFRAME.registerComponent('foo', {
    events: {
        click: function (evt) {
            console.log('This entity was clicked!');
            this.el.setAttribute('material', 'color', 'red');
        }
    },
    qux: function() {
        console.log("qux");
    }
});
