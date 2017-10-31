var http = require('http');
var fs = require('fs');
var	 length = 0;
fs.readFile('./hello.js', function(err,data){
	if( err){
		console.log(err);
	}else{
		console.log(data);
		// console.log(data.toString());
		length = data.toString().length;
console.log("in--------------->length="+length);
		http.createServer(function handler(req, res){
			// console.log('callback');
			// console.log(req);
			console.log('req!' + req);
			res.writeHead(200, {'Context-Type' : 'text/plain'});
			res.end('Hello World\n');
		}).listen(80);

		console.log('Server running at port 80');
	}
});

console.log("out------------>length="+length);

