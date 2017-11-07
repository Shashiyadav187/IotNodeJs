function first(data,callback) {
  callback(null,"First");
}

function second(data,callback) {
  callback(null,"Second");
}

function third(data,moreData,callback) {
  callback(null,"Third");
}


var a = "A";
first(a,function(error,data) {
  second(data,function(error,moreData) {
    third(data,moreData,function(error,evenMoreData) {
      //Do something with the data...
      console.log("data: "+data+", moreData:"+moreData+" evenMoreData:"+evenMoreData);
    });
  })
});