$(document).ready(function() {
  function fixup(wrap) {
    var $wrap = $(wrap);
    var $parent = $wrap.parent();
    
    $wrap.width($parent.width());
    $wrap.height($parent.height());

    return {width:$parent.width(),height:$parent.height()};
  }
  
  $(document).on('resize',function() {
    $('*[data-counter-gauge]').each(function(i,elt) { fixup(elt); });
  });
  
  $('*[data-counter-gauge]').each(function(i,elt) {
    var dim = fixup(elt)
    var name = $(elt).attr("data-counter-gauge");
    var svg   = d3.select(elt).append("svg");
    
    

    var g = svg.append("g")
      .attr("transform","translate("+(dim.width/2)+","+(dim.height/2)+")");
    var back  = g.append("path").attr("class","d3back");
    var front = g.append("path").attr("class","d3front");

    var r     = 0.5*Math.min(dim.width,dim.height) - 12.5;
    var arc   = d3.svg.arc()
    .innerRadius(r-12.5).outerRadius(r+12.5)
    .startAngle(1.1*Math.PI);



    var max = 1;
    arc.endAngle(function(d,i) {
      if(max < d) max = d;
      return 1.1*Math.PI + 1.8*Math.PI*(d/max);
    });
    
    back.attr("d",arc(1));
    $(document).on('data:'+name,function(event,data) {
      if(data > max) max = data;
      front.attr("d",arc(data));
    });    
  });

  $('*[data-counter-gauge2]').each(function(i,elt) {
    var dim = fixup(elt)
    var name = $(elt).attr("data-counter-gauge2");
    var svg   = d3.select(elt).append("svg");

    var g = svg.append("g")
      .attr("transform","translate("+(dim.width/2)+","+(dim.height/2)+")");

    var r     = 0.5*Math.min(dim.width,dim.height) - 12.5;
    var arc   = d3.svg.arc()
    .innerRadius(r-12.5).outerRadius(r+12.5)
    .startAngle(1.1*Math.PI);

    var max = 1;
    arc.endAngle(function(d,i) {
      if(max < d.endAngle) max = d.endAngle;
      return 1.1*Math.PI + 1.8*Math.PI*(d.endAngle/max);
    });
    var back  = g.append("path").datum({endAngle:1})
    .attr("class","d3back")
    .attr("d",arc);
    var front = g.append("path").datum({endAngle:0})
    .attr("class","d3front")
    .attr("d",arc);
    
    function arcTween(transition,newAngle) {
      transition.attrTween("d",function(d) {
        var interpolate = d3.interpolate(d.endAngle,newAngle);
        return function(t) {
          d.endAngle = interpolate(t);
          return arc(d);
        }
      });
    }
    
    
    $(window).resize(function() {
      dim = fixup(elt);
      g.attr("transform","translate("+(dim.width/2)+","+(dim.height/2)+")");
      r = 0.5*Math.min(dim.width,dim.height) - 12.5;
      arc.innerRadius(r-12.5).outerRadius(r+12.5);
      back.transition().duration(0).call(arcTween,max);
    });
    
    
    $(document).on('data:'+name,function(event,data) {
      if(data > max) max = data;
      front.transition().call(arcTween,data);
    });    
  });
  
  
  $('*[data-counter-bar]').each(function(i,elt) {
    var dim = fixup(elt)
    var name = $(elt).attr("data-counter-bar");
    console.log(name);
    var svg   = d3.select(elt).append("svg")
    .attr({
      class:"barchart",
      width:dim.width,
      height:dim.height
    });
    
    var dataLen= 30, max = 0;
    var values = [];
    $(document).on('data:'+name,function(event,data) {
      if(data > max) max = data;
      values.push(data);
      if(values.length >= dataLen) values.shift();
      
      var update = svg.selectAll("rect").data(values);
      //Add a new rectangle for each piece of data
      update.enter().append("rect").attr("width",dim.width/(dataLen-1))
      update
      .attr("x",function(d,i) { return i*dim.width/(dataLen-1); })
      .attr("y", function(d) { return dim.height - dim.height*(d/max); })
      .attr("height",function(d) { return dim.height*(d/max); })
    });
    
    
    
  });
  
  $('*[data-counter-bar2]').each(function(i,elt) {
    var dim = fixup(elt)
    var name = $(elt).attr("data-counter-bar2");
    console.log(name);
    var svg   = d3.select(elt).append("svg")
    .attr({
      class:"barchart",
      width:dim.width,
      height:dim.height
    });
    
    var dataLen= 30;
    var values = [];
    
    var y = d3.scale.linear().domain([0,1]).range([0,dim.height]);
    var x = d3.scale.linear().domain([0,dataLen-1]).range([0,dim.width]);
    $(document).on('data:'+name,function(event,data) {
      if(data > y.domain()[1]) y.domain([0,data]);
      
      values.push(data);
      if(values.length >= dataLen) values.shift();
      
      var update = svg.selectAll("rect").data(values);
      //Add a new rectangle for each piece of data
      update.enter().append("rect").attr("width",x(1))
      update
      .attr("x",function(d,i) { return x(i); })
      .attr("y", function(d) { return dim.height - y(d); })
      .attr("height",function(d) { return y(d); })
    });
    
    
    
  });
  
  $('*[data-counter-bar3]').each(function(i,elt) {
    var dim = fixup(elt)
    var name = $(elt).attr("data-counter-bar3");
    console.log(name);
    var svg   = d3.select(elt).append("svg")
    .attr({
      class:"barchart",
      width:dim.width,
      height:dim.height
    });
    
    
    
    var dataLen= 30;
    var values = [];
    
    var y = d3.scale.linear().domain([0,1]).range([dim.height-20,0]);
    var x = d3.scale.linear().domain([0,dataLen-1]).range([60,dim.width-10]);
    
    svg.append("g")
    .attr("class","x axis")
    .attr("transform","translate(0,"+(dim.height-20)+")")
    .call(d3.svg.axis().orient("bottom")
    .scale(x)
    );
    
    var yg    = svg.append("g")
      .attr("class","y axis")
      .attr("transform","translate(60,0)");
    var yaxis = d3.svg.axis()
    .ticks(5).orient("left")
    .scale(y);
    
    
    
    
    $(document).on('data:'+name,function(event,data) {
      if(data > y.domain()[1]) {
        y.domain([0,data]);
        yg.call(yaxis);
      }
      
      values.push(data);
      if(values.length >= dataLen) values.shift();
      
      var update = svg.selectAll("rect").data(values);
      //Add a new rectangle for each piece of data
      update.enter().insert("rect","g").attr("width",x(1)-x(0))
      update
      .transition()
      .attr("x",function(d,i) { return x(i); })
      .attr("y", function(d) { return y(d); })
      .attr("height",function(d) { return (dim.height-20) - y(d); })
    });
    
    
    
  });
  
  
});