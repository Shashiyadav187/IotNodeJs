function bindCounter(counterName,$elt) {


  $elt.text("--");
  
  
  var $dir = $('span[data-direction='+counterName+']');
  var $chg = $('span[data-change='+counterName+']');
  
  var last = NaN;
  
  
  $(document).on('data:'+counterName,function(event,data) {
    $elt.text(data);
    if(isFinite(last)) {
      
      var diff = data - last;
      if(diff > 0) {
        $dir.removeClass("glyphicon-arrow-down");
        $dir.addClass("glyphicon-arrow-up");
      } else {
        $dir.removeClass("glyphicon-arrow-up");
        $dir.addClass("glyphicon-arrow-down");        
      }
      diff = Math.abs(diff);
      
      if($chg.hasClass("percentage")) {
        diff = Math.round(1000*diff/last)/10;
        $chg.text(diff+"%");
      } else {
        $chg.text(diff);
      }
      
    }
    last = data;
  });
  
  $chg.on('click',function() { $chg.toggleClass("percentage"); });
}


function bindCounters() {
  $('*[data-counter]').each(function(i,elt) {
    bindCounter($(elt).attr("data-counter"),$(elt))
  });
}




$(document).ready(function() {
  bindCounters();

});
