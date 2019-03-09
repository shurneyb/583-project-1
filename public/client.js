/*global ScrollMagic, Chart*/
// client-side js
// run by the browser each time your view template is loaded

// use object to store variables for chart
var chartVars = {};

document.addEventListener("DOMContentLoaded", function(event) {
  
  // ensure js is running
  console.log("DOM fully loaded and parsed");
  console.log('scroll magic is working!', ScrollMagic);
  
  // instantiate scroll magic stuff
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
  
  // get marvel data from server
  fetch('/marvel').then(resp => resp.json()).then((data) => {
    console.log(data);
    let d = data[0];
    
    
    function getMyCallback(randomValue)
{
    return function(otherParam)
    {
        return randomValue * otherParam //or whatever it is you are doing.
    }

}
    // put values in chart variables
    chartVars.series = d.series.available;
    chartVars.comics = d.comics.available;
    chartVars.stories = d.stories.available;
    chartVars.events = d.events.available;
    
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

  // instantiate chart
  var ctx = document.getElementById("myChart");
  
  // start adapted from https://www.chartjs.org/docs/latest/getting-started/
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["# of series", "# of comics", "# of stories", "# of events"],
        datasets: [{
          label: '',
          data: [chartVars.series, chartVars.comics, chartVars.stories, chartVars.events],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)'
          ],
          borderColor: [
            'black',
            'black',
            'black',
            'black'
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
  // end adapted from https://www.chartjs.org/docs/latest/getting-started/
  
});
