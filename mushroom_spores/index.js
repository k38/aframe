//@ts-check
document.addEventListener('DOMContentLoaded', DOMContentLoaded);

function DOMContentLoaded(){
    document.querySelector("a-scene").renderer.gammaOutput=true;
    const assetsEl = document.querySelector("a-assets");
    assetsEl.addEventListener("loaded", assetsLoaded);
}

function assetsLoaded(e) {
    const particles = document.querySelectorAll("[particle-system]");
    particles.forEach((p)=>{
        p.setAttribute("particle-system", "enabled", true);
    });
}