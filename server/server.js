// ----- START VAR ----- //
var app;
var http = require('http');
var express = require('express');
var port = 3000;
var chostName = 'localhost';

// Server pages Path
var getPath = {
	//startPage: ['/', 'Start Page'],
	helloPage: ['/hello', 'Hello, your beautifull'],
	goodbyPage: ['/goodby', 'Goodby, your beautifull']
}





// ----- MAIN CODE ----- //
// Use Express framework
app = express();

// Create path to static files
app.use(express.static('../client'));

// Create Server
http.createServer(app).listen(port);

// Create Path to Pages
createGets(getPath);


// Console manual information
console.log('Server start on port: ' + port);
console.log('To connect use ' + chostName + ':' + port);





// ----- FUN ----- //
function fgCreateGet(reqPath, sendDate){
	app.get(reqPath, function(req, res){
		res.send(sendDate);
	});
}

function createGets(obj){
	var array;
	for (i in obj){
		array = obj[i];
		fgCreateGet(array[0], array[1]);
	}
}