$(document).ready(function() {
  function fixup(elt) {
    var $elt = $(elt);
    var $wrap   = $elt.parent();
    var $parent = $wrap.parent();
    
    var pos     = $parent.position();
    
    $wrap.width($parent.width());
    $wrap.height($parent.height());
    
    elt.setAttribute("viewBox","0 0 "+$parent.width()+" "+$parent.height());
    return {width:$parent.width(),height:$parent.height()};
  }
  
  
  var mid = (2.4-0.6)*0.56 + 0.6;
  function drawArc(elt,dim,pct) {
    var cx = dim.width/2;
    var cy = dim.height/2;
    var r  = Math.min(cx,cy) - 12.5;
    
    var angle  = ((2.4-0.6)*pct + 0.6)*Math.PI;

    var sx = cx + r*Math.cos(0.6*Math.PI);
    var sy = cy + r*Math.sin(0.6*Math.PI);
    
    var ex = cx + r*Math.cos(angle);
    var ey = cy + r*Math.sin(angle);
    elt.attr("d",["M",sx,sy,"A",r,r,0,angle <= mid*Math.PI ? 0 : 1,1,ex,ey].join(" "));
  }
  
  $('*[data-counter-gauge]').each(function(i,elt) {
    var dim = fixup(elt)
    var name = $(elt).attr("data-counter-gauge");
    
    drawArc($(elt).children(".back"),dim,1);
    var front = $(elt).children(".front");
    var max   = 0;
    $(document).on('data:'+name,function(event,data) {
      if(data > max) max = data;
      drawArc(front,dim,data/max);
    });
  });
});