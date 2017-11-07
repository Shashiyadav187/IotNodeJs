exports = module.exports = function() {
  console.log("A primary function");
}

function notExported() {
  console.log("This function can only be used internally");
}

exports.exported = function() {
  console.log("This can be called externally");
}

exports.callInternal = function() {
  notExported();
}