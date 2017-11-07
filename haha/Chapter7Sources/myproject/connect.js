var connect = require('connect')
,   url     = require('url')
,   path    = require('path')
,   fs      = require('fs')
;

function static(srcDir) {
  return function(request,response,next) {
    if(request.method != "GET") return next();
    var p = path.join(process.cwd(),srcDir,url.parse(request.url).pathname);
    fs.exists(p,function(yes) {
      if(!yes) return next();
      fs.createReadStream(p).pipe(response);
    });

  }
}


var app = connect()
//.use(connect.static('public'))
.use(static('public'))
.use(function(request,response) {
  response.writeHead(404,{'content-type':'text/plain'});
  response.end("File Not Found");
})
.listen(3000);