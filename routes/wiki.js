const express = require('express')
var router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 



router.get('/', function(req, res, next) {
	Page.findAll({
}).then(
function(allpages){ 
	console.log(allpages)
	res.render('index',
	{
	pages: allpages
	})
}	
)
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

router.get('/:urlTitle', function (req, res, next) {

  Page.findOne({ 
    where: { 
      urlTitle: req.params.urlTitle 
    } 
  })
  .then(function(page){
    res.render('wikipage', {
    	title: page.title,
    	content: page.content
    })
  })
  .catch(next);

});


router.post('/', function(req, res, next) {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });
  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save()
  	.then(function(val){
  		res.redirect(val.route())
  	})
});

module.exports = router;