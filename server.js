// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

//my code

var api = require('marvel-api');
 
var marvel = api.createClient({
  publicKey: process.env.PUBLIC_KEY
, privateKey: process.env.PRIVATE_KEY
});

app.get('/marvel', (request, response) => {
 let data;
  marvel.characters.findByName('daredevil')
  .then(
  r => {
   response.send(r.data); 
  }
  )
  .fail(console.error)
  .done();
});

	$(function () { // wait for document ready
		// init
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
				.addIndicators() // add indicators (requires plugin)
				.addTo(controller);
		}
	});

  //end my code

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
