module.exports = function(options) {
  options = options || {};
  
  return function sse(req,res,next) {
    
    res._counts = {};
    res._nextId = function(type) {
      type = type || "message";
      count = (this._counts[type] || 0) + 1;
      this._counts[type] = count;
      return count;
    }
    
    if(req.accepts("text/event-stream")) {
      req.setTimeout(Infinity);
      res.writeHead(200,{
        'Content-Type':  'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection':    'keepalive'
      });
    } else {
      res.writeHead(200,{
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Connection': 'keepalive'
      })
    }

    res.event = function(event,type,opt) {
      opt  = opt  || {};
      type = type || options.event;
      
      if(type) 
        this.write("event:"+type+"\n");
      this.write("id:"+this._nextId(type)+"\n");
      if(opt.retry)
        this.write("retry:"+opt.retry+"\n");
      this.write("data:"+event+"\n\n");
    }
  
    res.json = function(json,type,opt) {
      this.event(JSON.stringify(json),type,opt);
    }
    
    next();

  }
  
};
