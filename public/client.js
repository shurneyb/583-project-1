/*global ScrollMagic*/
// client-side js
// run by the browser each time your view template is loaded

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
  console.log('scroll magic is working!', ScrollMagic);

  fetch('/marvel').then(resp => resp.json()).then((data) => {
    var char= []; 
    char.push(data[0]);
    console.log(char);
  });
      
});
