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

var Chart = require('chart.js');

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


  //end my code

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
