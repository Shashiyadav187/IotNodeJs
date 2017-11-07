$(document).ready(function() {

  var events = new EventSource('/api/v1/dashboard');

  events.addEventListener('open',function(e) {
    if(window.console) console.log("opened SSE connection");
  });

  events.addEventListener('error',function(e) {
    if(e.readyState != EventSource.CLOSED) {
      if(window.console) console.log("SSE error");
    } else
      if(window.console) console.log("closed SSE connection");
  });
  
  events.addEventListener('counters',function(e) {
    var data =  JSON.parse(e.data);
    for(counter in data)
      $(document).trigger('data:'+counter,data[counter]);
  });
  
  
});