$(document).ready(function() {
  // Inspired by Lee Byron's test data generator.
  function bumpLayer(n) {

    function bump(a) {
      var x = 1 / (.1 + Math.random()),
          y = 2 * Math.random() - .5,
          z = 10 / (.1 + Math.random());
      for (var i = 0; i < n; i++) {
        var w = (i / n - y) * z;
        a[i] += x * Math.exp(-w * w);
      }
    }

    var a = [], i;
    for (i = 0; i < n; ++i) a[i] = 0;
    for (i = 0; i < 5; ++i) bump(a);
    return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
  }
  
  
  
  var svg = d3.select("div#streamgraph").append("svg")
  .style("width","100%")
  .style("height", "300px");
  
  var width = $("div#streamgraph").width();
  var height= $("div#streamgraph").height();  
  

  //Generate some test data
  var values = d3.range(10).map(function() {
    return bumpLayer(100);
  });
  
  var stack = d3.layout.stack()
  .offset("wiggle");
  values = stack(values);
  
  var max = 0;
  for(i in values) {
    var m = d3.max(values[i],function(d) { return d.y + d.y0; });
    if(m > max) max = m;
  }
  console.log(max); 
  
  
  var x     = d3.scale.linear().domain([0,99]).range([0,width]);
  var y     = d3.scale.linear().domain([0,max]).range([height,0]);
  var color = d3.scale.linear().range(["#000","#ccc"]);

  var area  = d3.svg.area()
  .x(function(d) { return x(d.x); })
  .y0(function(d) { return y(d.y0); })
  .y1(function(d) { return y(d.y0 + d.y); });
  
  svg.selectAll("path").data(values)
  .enter().append("path")
  .attr("d",area)
  .style("fill",function(d) { return color(Math.random()); });

  
  
});