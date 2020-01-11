//@ts-check
document.addEventListener('DOMContentLoaded', DOMContentLoaded);

function DOMContentLoaded(){
    const red = document.querySelector("#red");
    red.addEventListener("animationbegin", ()=>{ console.log("animationbegin") });
    red.addEventListener("animationcomplete", ()=>{ console.log("animationcomplete") });

    const indigo = document.querySelector("[color=indigo]");
    indigo.addEventListener("animationcomplete__1", ()=>{ console.log("animationcomplete__1") });
    indigo.addEventListener("animationcomplete__2", ()=>{ console.log("animationcomplete__2") });
}
