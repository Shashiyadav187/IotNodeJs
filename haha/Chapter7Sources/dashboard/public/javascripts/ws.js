$(document).ready(function() {
  var socket = io.connect("/");
  socket.on('counters',function(data) {
    for(counter in data)
      $(document).trigger('data:'+counter,data[counter]);    
  });
});