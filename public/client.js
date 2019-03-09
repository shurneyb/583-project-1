/*global ScrollMagic, Chart*/
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
    document.getElementById('details').innerHTML = '<img class="icon" src="https://cdn.glitch.com/6bbc355b-2452-4bc6-bd23-083a6f363155%2Fperson.svg?1552029122059"><a href="' + d.urls[0].url + '" target="_blank" >Details</a>'
    
    // link to wiki
    document.getElementById('wiki').innerHTML = '<img class="icon" src="https://cdn.glitch.com/6bbc355b-2452-4bc6-bd23-083a6f363155%2Fmagnify.svg?1552029121931"><a href="' + d.urls[1].url + '" target="_blank" >Wiki</a>'
    
    // link to comics
    document.getElementById('comics').innerHTML = '<img class="icon" src="https://cdn.glitch.com/6bbc355b-2452-4bc6-bd23-083a6f363155%2Fbook.svg?1552029122135"><a href="' + d.urls[2].url + '" target="_blank" >Comics</a>'
    
  });

  var ctx = document.getElementById("myChart");
  
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
});
