var express = require('express')
,   routes  = require("./routes")
,   path    = require('path')
,   app     = express()
,   server  = require('http').createServer(app)
,   sse     = require('./lib/sse')
;

var argv    = require('optimist')
.usage("Usage: $0")
.options("port",{alias:"P",default:3000})
.options("redis",{alias:"r"})
.options("counters",{alias:"c",default:"counters"})
.argv
;


app
.set("port",argv.port)
.set("views",path.join(__dirname,"views"))
.set("view engine","jade")
.use(express.favicon())
.use(express.logger('dev'))
.use(express.json())
.use(express.urlencoded())
.use(express.methodOverride())
.use(app.router) //MVC routing
.use(require('less-middleware')({ src: path.join(__dirname, 'public') }))
.use(express.static(path.join(__dirname, 'public')));

app.get('/',    routes.index);
app.get('/sse', routes.sse);
app.get('/ws',  routes.ws);
app.get('/canvas_ex1', routes.canvas_ex1)
app.get('/canvas_ex2', routes.canvas_ex2)
app.get('/svg_ex1', routes.svg_ex1)
app.get('/d3_ex1', routes.d3_ex1)
app.get('/d3_ex2', routes.d3_ex2)
app.get('/d3_ex3', routes.d3_ex3)
app.get('/d3_ex4', routes.d3_ex4)



var counters = argv.redis ? require('./lib/counters-redis')(argv.redis,{counters:argv.counters}) : require('./lib/counters');
app.set("counters",counters);

app.get('/api/v1/dashboard', sse(), routes.dashboard);


app.get('/api/v1/incr/:counter', function(req,res) {
  counters.increment(req.params.counter,req.query.amount,function() {
    res.end("OK\n");
  });
});
app.get('/api/v1/counter/:counter',function(req,res) {
  counters.get(req.params.counter,function(err,data) {
    res.end(data+"\n");
  });
});
app.get('/api/v1/state',function(req,res) {
  counters.state(function(err,data) {
    for(var counter in data) {
      res.write(counter+": "+data[counter]+"\n");
    }
    res.end();
  });
});


server.listen(argv.port);
var ws = require('socket.io').listen(server);
ws.sockets.on('connection',function(socket) {
  function update(counter,value) {
    var msg = {};msg[counter] = value;
    socket.emit('counters',msg);
  }
  counters.state(function(err,data) {
    socket.emit("counters",data);
  });
  counters.on('updated',update);
  socket.on('disconnect',function() {
    counters.removeListener('counters',update);
  });
});

