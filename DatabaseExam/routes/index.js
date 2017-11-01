var express = require('express');
var router = express.Router();

// haha start
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'test1234',
  database : 'iot'
});
 
connection.connect();
// haha end

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  connection.query('select * from user',
  	function(err, results, fields){
  		if(err){
  			res.send(JSON.stringify(err));
  		}else{
  			res.send(JSON.stringify(results));
  		}
  	});
});

module.exports = router;
