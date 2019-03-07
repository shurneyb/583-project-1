/*global ScrollMagic, Chart */

// client-side js
// run by the browser each time your view template is loaded

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
  console.log('scroll magic is working!', ScrollMagic);

  
  
    
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
       var char= []; 
  

  char.push(data[0]);
    console.log(char);
    
//     append char name to panel
    var h1 = document.createElement('h1');
    h1.innerHTML = char[0].name;
    document.getElementById("name").appendChild(h1);
    
//     append his origin story to panel
    var story = document.createElement('p');
    story.innerHTML = char[0].description;
    document.getElementById("content").appendChild(story);

    
    
})

    
fetch('/marvel').then(resp => resp.json()).then((data) => {
  
  
   var characters=[];
  var appearances=[];
  console.log('data',data);
  
      
//     makes an array with the number of appearances for each character

    for(var i = 1; i < 6; i++) {
     characters.push(data[i].name);
      appearances.push(data[i].comics.available);
    }
    console.log('test', appearances);
    

  
//   my Chart
  var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: characters,
        
        datasets: [{
          
            backgroundColor: '#EE0400',
            borderColor: 'rgb(247, 244, 238)',
            data: appearances,
          label: "Number Appearances in Comics",
        }]
    },

    // Configuration options go here
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
  
      
})