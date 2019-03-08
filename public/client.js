/*global ScrollMagic*/
// client-side js
// run by the browser each time your view template is loaded

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
  console.log('scroll magic is working!', ScrollMagic);
  var controller = new ScrollMagic.Controller();
  var scene = new ScrollMagic.Scene();
  
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

  fetch('/marvel').then(resp => resp.json()).then((data) => {
    console.log(data);
    let d = data[0];
    
    // add picture of character
    document.getElementById('pic').innerHTML = '<img id="picture" src="' + d.thumbnail.path + '.' + d.thumbnail.extension +'" alt="' + d.name + '">';

    // add name
    document.getElementById('name').innerHTML = d.name;
        
    // add description
    document.getElementById('description').innerHTML = d.description;
    
    // link to "details"
    document.getElementById('details').innerHTML = '<a href="' + d.urls[0].url + '" target="_blank" >Details</a>'
    
    // link to wiki
    document.getElementById('wiki').innerHTML = '<a href="' + d.urls[1].url + '" target="_blank" >Wiki</a>'
    
    // link to comics
    document.getElementById('comics').innerHTML = '<a href="' + d.urls[2].url + '" target="_blank" >Comics</a>'
    
  });

      
  
});
