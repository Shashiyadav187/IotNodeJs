$(document).ready(function() {
  function fixup(wrap) {
    var $wrap = $(wrap);
    var $parent = $wrap.parent();
    
    $wrap.width($parent.width());
    $wrap.height($parent.height());

    return {width:$parent.width(),height:$parent.height()};
  }
  
  $('*[data-counter-bar4]').each(function(i,elt) {
    var dim = fixup(elt)
    var name = $(elt).attr("data-counter-bar4");

    var chart = nv.models.historicalBarChart()
    .margin({left:50,bottom:20,right:20,top:20})
    .x(function(d,i) { return i; })
    .y(function(d,i) { return d; })
    .transitionDuration(250);

    chart.showXAxis(true);
    chart.yAxis
    .axisLabel("Value");
    

    var values = [];
    var dataLen   = 30;
    d3.select(elt).append("svg").datum([{values:values,key:"Data",color:"#ccc"}])
    .transition().duration(0).
    call(chart);
    
    $(document).on('data:'+name,function(event,data) {
      values.push(data);
      if(values.length >= dataLen) values.shift();
      chart.update();
    });  
    
    
    
    
  });
  
  
  $('*[data-counter-bar5]').each(function(i,elt) {
    var dim   = fixup(elt)
    var name  = $(elt).attr("data-counter-bar5");

    var chart = nv.models.lineChart()
    .margin({left:50,bottom:20,right:20,top:20})
    .x(function(d,i) { return i; })
    .y(function(d,i) { return d; })
    .transitionDuration(250);

    chart.showXAxis(true);
    chart.yAxis
    .axisLabel("Value");
    

    var values = [];
    var dataLen   = 30;
    d3.select(elt).append("svg").datum([{values:values,key:"Data",color:"#ccc"}])
    .transition().duration(0).
    call(chart);
    
    $(document).on('data:'+name,function(event,data) {
      values.push(data);
      if(values.length >= dataLen) values.shift();
      chart.update();
    });  
        
    
    
  });
  
  
});