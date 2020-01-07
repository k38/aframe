//@ts-check
document.addEventListener('DOMContentLoaded', DOMContentLoaded);

function DOMContentLoaded(){
    const assetsEl = document.querySelector("a-assets");
    assetsEl.addEventListener("loaded", (e)=>{ console.log(`assetsEl loaded`); console.log(e); });
    assetsEl.addEventListener("timeout", (e)=>{ console.log(`assetsEl timeout`); console.log(e); });

    const assetItemEl = document.querySelector("a-asset-item");
    assetItemEl.addEventListener("error", (e)=>{ console.log(`assetItemEl error`); console.log(e); });
    assetItemEl.addEventListener("progress", (e)=>{ console.log(`assetItemEl progress`); console.log(e); });
    assetItemEl.addEventListener("loaded", (e)=>{ console.log(`assetItemEl loaded`); console.log(e); });
}