document.addEventListener('DOMContentLoaded', function() {
  var current = 1;
  console.log("loaded");
  // var link = document.querySelector("#link");
  var plane = document.querySelector("a-plane");
  var sky = document.querySelector("a-sky");
  // plane.addEventListener("mouseenter", ()=>{
  //   console.log("enter");
  // });
  plane.addEventListener("click", ()=>{
    console.log("click");
    current++;
    if ( current >= 4 ) {
      current = 1;
    }
    sky.setAttribute("src", `#img${current}`);
  });
});


// var link = document.querySelector("#link");
// var sky = docuemnt.querySelector("a-sky");

// link.addEventListener("click", ()=>{
//   console.log("click");
//   sky.setAttribute("src", "#thumb002");
// });

// link.addEventListener("mouseenter", ()=>{
//   console.log("mouseenter");
//   sky.setAttribute("src", "#thumb002");
// });


// var boxEl = document.querySelector('a-box');
// // カーソルがぶつかったら拡大
// boxEl.addEventListener('mouseenter', function () {
//   boxEl.setAttribute('width', 10);
//   console.log("mouseenter");
// });

// // カーソルが離れたら元にもどす
// boxEl.addEventListener('mouseleave', function () {
//   boxEl.setAttribute('width', 3);
//   console.log("mouseleave");
// });
