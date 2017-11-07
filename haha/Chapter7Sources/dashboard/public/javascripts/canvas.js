$(document).ready(function() {
  
  function drawGauge(ctx,value,max) {
    //Clear the gauage
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    
    //Draw the gauge background
    var centerX = (ctx.canvas.width) / 2;
    var centerY = (ctx.canvas.height) /2;
    var radius  = Math.min(centerX,centerY) - 12.5;
    
    
    ctx.beginPath();
    ctx.arc(centerX,centerY,radius,0.6*Math.PI,2.4*Math.PI)
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth   = 25;
    ctx.stroke();
    
    var newEnd = (2.4-0.6)*(value/max) + 0.6;

    ctx.beginPath();
    ctx.arc(centerX,centerY,radius,0.6*Math.PI,newEnd*Math.PI)
    ctx.strokeStyle = "#aaa";
    ctx.lineWidth   = 25;
    ctx.stroke();
    
    
  }
  
  function fixup(elt) {
    var $elt = $(elt);
    var $wrap   = $elt.parent();
    var $parent = $wrap.parent();
    
    var pos     = $parent.position();
    
    $wrap.width($parent.width());
    $wrap.height($parent.height());
    
    elt.width = $parent.width();
    elt.height= $parent.height();
    
  }
  
  
  $('*[data-canvas-gauge]').each(function(i,elt) {
    fixup(elt);
    var name = $(elt).attr("data-canvas-gauge");
    var ctx  = elt.getContext("2d");
    
    drawGauge(ctx,0,100);
    
    var max = 100;
    $(document).on('data:'+name,function(event,data) {
      if(data > max) max = data;
      drawGauge(ctx,data,max);
    });

  });
  
  var maxValues = 20; 
  function drawChart(ctx,values,max) {

    
    //Clear the gauage
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

    var valHeight = ctx.canvas.height/max;
    var valWidth  = ctx.canvas.width/(maxValues-1);

    if(values.length < 2) return;    
    ctx.beginPath();
    ctx.moveTo(0,ctx.canvas.height);
    for(var i=0;i<values.length;i++) {
      ctx.lineTo(i*valWidth,ctx.canvas.height - values[i]*valHeight);
    }
    ctx.lineTo(valWidth*(values.length-1),ctx.canvas.height);
    ctx.fillStyle = "#ccc";
    ctx.fill();
  }
  
  
  $('*[data-canvas-chart]').each(function(i,elt) {
    fixup(elt);
    var name = $(elt).attr("data-canvas-chart");
    var ctx  = elt.getContext("2d");
    
    var chart = [];
    var max   = 100;
    $(document).on('data:'+name,function(event,data) {
      if(data > max) max = data;
      
      chart.push(data);
      if(chart.length > maxValues) chart.shift();
      
      drawChart(ctx,chart,max);
    });

  });
  

  
  
});