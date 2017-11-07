var events = require('events')
,   util   = require('util')
;

function Counter() {
  //Returns the singleton instance if it exists
  if(arguments.callee.__instance) {
    return arguments.callee.__instance;
  }
  arguments.callee.__instance = this;
  
  this._state = { };
  
  events.EventEmitter.call(this);
}
util.inherits(Counter,events.EventEmitter);
module.exports = new Counter();

Counter.prototype.state = function(cb) {
  return cb(null,this._state);
};

Counter.prototype.get = function(counter,cb) {
  return cb(null,this._state[counter] || 0);
};

Counter.prototype.set = function(counter,value,cb) {
  this._state[counter] = (value || 0);
  this.emit("updated",counter,this._state[counter]);
  return cb(null,this._state[counter]);
};

Counter.prototype.increment = function(counter,amount,cb) {
  var self = this;
  this.get(counter,function(err,count) {
    self.set(counter,count + 1*(amount||1),cb);
  })
};

