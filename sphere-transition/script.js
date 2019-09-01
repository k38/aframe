var boxEl = document.querySelector('a-box');
// カーソルがぶつかったら拡大
boxEl.addEventListener('mouseenter', function () {
  boxEl.setAttribute('width', 10);
  console.log("mouseenter");
});

// カーソルが離れたら元にもどす
boxEl.addEventListener('mouseleave', function () {
  boxEl.setAttribute('width', 3);
  console.log("mouseleave");
});
