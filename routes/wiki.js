const express = require('express')
var router = express.Router();


router.get('/', function(req, res, next) {
  res.send('got to GET /wiki/');
});

// wikiRouter.get('/add', function(req, res, next) {
//   res.send('got to GET /wiki/add');
// });

router.get('/add', function(req, res) {
  res.render('addpage');
});


router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/', function(req, res, next) {
console.log(req.body)
  res.json(req.body);
});

module.exports = router;