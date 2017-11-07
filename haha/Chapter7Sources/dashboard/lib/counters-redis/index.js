var redis  = require('redis')
,   events = require('events')
,   util   = require('util')
;

function Counter(host,options) {
  //Returns the singleton instance if it exists
  if(arguments.callee.__instance) {
    return arguments.callee.__instance;
  }
  arguments.callee.__instance = this;
  events.EventEmitter.call(this);

  this.options     = options || {};
  this.client      = redis.createClient(this.options.port || 6379,host);
  this.counterName = this.options.counters || "counters";

  this.pubsub = redis.createClient(this.options.port || 6379,host);
  var self = this;
  this.pubsub.on('ready',function() {
    self.pubsub.subscribe(self.counterName);
  });
  
  this.pubsub.on('message',function(channel,message) {
    if(channel == self.counterName) {
      self._sendUpdate(message);
    }
  });
  
}
util.inherits(Counter,events.EventEmitter);
module.exports = function(host,options) { new Counter(host,options); }

Counter.prototype._sendUpdate = function(counter) {
  var self = this;
  this.get(counter,function(err,data) {
    if(err) return;
    self.emit("updated",counter,data);
  });
};

Counter.prototype.state = function(cb) {
  this.client.hgetall(this.counterName,cb);
};

Counter.prototype.get = function(counter,cb) {
  this.client.hget(this.counterName,counter,cb);
};

Counter.prototype.set = function(counter,value,cb) {
  var self = this;
  this.client.hset(this.counterName,counter,value,function(err,data) {
    if(err) return cb(err,data);
    self.client.publish(self.counterName,counter);
  });
};

Counter.prototype.increment = function(counter,amount,cb) {
  var self = this;
  this.client.hincrby(this.counterName,counter,amount,function(err,data) {
    if(err) return cb(err,data);
    self.client.publish(self.counterName,counter);
    cb(err,data);
  });
};

module.exports = function(host) {
  return new Counter(host);
};