exports.index = function(req, res){
  res.render('index', { title: 'Counter Dashboard' });
};

exports.sse  = function(req,res) {
  res.render('sse', {title: 'Server Sent Events Dashboard'});
};

exports.ws  = function(req,res) {
  res.render('ws',{title:'WebSockets Dashboard'});
};

exports.canvas_ex1 = function(req,res) {
  res.render('canvas_ex1',{title:'Canvas Example 1'});
};

exports.canvas_ex2 = function(req,res) {
  res.render('canvas_ex2',{title:'Canvas Example 2'});
};

exports.svg_ex1 = function(req,res) {
  res.render('svg_ex1',{title:'SVG Example 1'});
};
exports.d3_ex1 = function(req,res) {
  res.render('d3_ex1',{title:'D3 Example 1'});
};
exports.d3_ex2 = function(req,res) {
  res.render('d3_ex2',{title:'D3 Example 3'});
};
exports.d3_ex3 = function(req,res) {
  res.render('d3_ex3',{title:'D3 Example 4'});
};
exports.d3_ex4 = function(req,res) {
  res.render('d3_ex4',{title:'D3 Example 5'});
};


exports.dashboard = function(req,res) {
  
  var counters = req.app.get('counters');
  
  counters.state(function(err,data) {
    console.log(data);
    res.json(data,"counters");
  });

  function update(counter,value) {
    var msg = {};msg[counter] = value;
    res.json(msg,"counters");
  }

  counters.on("updated",update);

  res.on("close",function() {
    counters.removeListener("updated",update);
  });
  
};