var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.greeting = "Hi!!!";
  res.render('index', { title: 'Express',  counter:req.session.counter  });
});


module.exports = router;
