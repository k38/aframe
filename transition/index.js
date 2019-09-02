document.addEventListener('DOMContentLoaded', function() {
  const max = 3;
  let current = 1;

  const plane = document.querySelector("#next");
  const sky = document.querySelector("a-sky");
  const assets = document.querySelector("a-assets");
  const setImage = (current)=>{
    sky.setAttribute("src", `#img${current}`);
    const next = current + 1 > max ? 1 : current + 1;
    plane.setAttribute("src", `#thumb${next}`);
  };

  for ( let i=1 ; i<=max ; i++ ) {
    assets.appendChild(newImage("img", i));
    assets.appendChild(newImage("thumb", i));
  }
  setImage(1);

  plane.addEventListener("click", ()=>{
    current = current >= max ? 1 : current + 1;
    setImage(current);
  });
  plane.addEventListener("mouseenter", ()=>{
    const size = "0.4";
    plane.setAttribute("width", size);
    plane.setAttribute("height", size);
  });
  plane.addEventListener("mouseleave", ()=>{
    const size = "0.3";
    plane.setAttribute("width", size);
    plane.setAttribute("height", size);
  });
});

function newImage(prefix, num) {
  const img = new Image();
  img.src = `${prefix}${num}.jpg`;
  img.crossOrigin = "anonymous";
  img.id = `${prefix}${num}`;
  return img;
}
