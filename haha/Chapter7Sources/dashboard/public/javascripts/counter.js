$(document).ready(function() {
  $('*[data-counter]').each(function(i,elt) {
    var name = $(elt).attr("data-counter");
    setInterval(function() {
      $(document).trigger("data:"+name,Math.round(10000*Math.random()));
    },1000+Math.round(4000*Math.random()));
  });
});
