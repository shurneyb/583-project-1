/*global ScrollMagic*/
// client-side js
// run by the browser each time your view template is loaded

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
  console.log('scroll magic is working!', ScrollMagic);
  var controller = new ScrollMagic.Controller();
  var scene = new ScrollMagic.Scene();

  fetch('/marvel').then(resp => resp.json()).then((data) => {
    console.log(data);
  });
      
    var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: 'onLeave'
    }
  });

  // get all slides
  var slides = document.querySelectorAll("section.panel");

  // create scene for every slide
  for (var i=0; i<slides.length; i++) {
    new ScrollMagic.Scene({
        triggerElement: slides[i]
      })
      .setPin(slides[i])
      .addTo(controller);
  }
  
});
