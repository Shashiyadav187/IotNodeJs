var http        = require('http')
,   url         = require('url')
,   querystring = require('querystring')
;

http.createServer(function(request,response) {
  var query = querystring.parse(url.parse(request.url).query || "");
  response.writeHead(200,{'content-type':"text/plain"});
  response.end("Hello "+(query.name || "Anonymous")+"\n");
}).listen(3000);
