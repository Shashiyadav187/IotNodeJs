var mod = require('./lib/module.js');

mod.exported();
// Prints "This can be called externally"

mod.callInternal();
// Prints "This function can only be used internally"

mod();
// Prints "A primary function"

mod.notExported();
// Throws an exception "Object #<Object> has no method 'notExported'"

