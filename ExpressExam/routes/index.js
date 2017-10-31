var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Hello World' });
  res.send(JSON.stringify({method:'GET', url:'/'}));
});

// router.get('/getAll', function(req, res, next) {
//   // res.render('index', { title: 'Hello World' });
//   res.send(JSON.stringify({method:'GET', url:'/getAll'}));
// });

router.post('/', function(req, res, next){
	res.send(JSON.stringify({method:'POST', url:'/'}));
})
router.put('/', function(req, res, next){
	res.send(JSON.stringify({method:'PUT', url:'/'}));
})
router.delete('/', function(req,res, next){
	res.send(JSON.stringify({method:'DELETE', url:'/'}));
})
module.exports = router;
