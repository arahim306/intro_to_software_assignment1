var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);
  var pathName = parsedUrl.pathname;

  response.writeHead(200, {'Content-Type': 'text/plain'});
  if( pathName == "/listings") {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(JSON.stringify(listingData));
    response.end();
  }
  else {
    response.writeHead(404);
    response.write('Bad gateway error');
    response.end();
  }
};

fs.readFile('listings.json', 'utf8', function(err, data) {
   if( err ) throw err; //see if there's an error
   listingData = JSON.parse(data); //parse json file into listingData
   http.createServer(requestHandler).listen(port); //start server using requestHandler declared above
});