//@ts-check
document.addEventListener('DOMContentLoaded', DOMContentLoaded);

function DOMContentLoaded(){
    console.log("DOMContentLoaded");
    const entity = document.querySelector("a-entity");

    // entity.addEventListener("stateadded", function(evt){
    //     if (evt.detail.state === "selected"){
    //         console.log("Entity now selected!");
    //     }
    // });
    // entity.addState("selected");
    // entity.is("selected");
    // console.log(entity.is("selected"));

    // entity.emit("rotate");
    // entity.emit("sink", null, false);

    // entity.setAttribute("material", {color: "blue"});
    // entity.flushToDOM(true);
    // entity.sceneEl.flushToDOM(true);

    // entity.setAttribute("material", "color", "green");

    // entity.addEventListener("child-attached", function(evt) {
    //     console.log("child-attached");
    // });
    // entity.addEventListener("child-detached", function(evt) {
    //     console.log("child-detached");
    // });
    // const child = document.createElement("a-entity");
    // entity.appendChild(child);
    // entity.removeChild(child);

    
}