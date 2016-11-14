const express = require('express')
var router = express.Router();
var models = require('../models');
const bluebird = require('bluebird');
var Page = models.Page;
var User = models.User;



router.get('/', function(req, res, next) {
	Page.findAll({})
    .then(function(allpages){
      console.log(allpages)
      res.render('index',{
	       pages: allpages
      })
    })
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

router.get('/users', function(req,res,next){
  User.findAll({})
  .then(function(users){
    res.render('users', {users: users});
  })
  .catch(next);
})
router.get('/users/:id', function(req,res,next){
  console.log(req.params.id)
  Page.findAll({where: {
    authorId: req.params.id
  }})
  .then(function(pages){
    res.render('index', {pages: pages});
  })
  .catch(next);
})

router.get('/user/:id',function(req,res,next){
var user =  User.findOne({
    where: {
      id: req.params.id
    }
  })
var page = Page.findAll({where: {
    authorId: req.params.id
  }})
Promise.all([user,page]).then(function(val){
  res.render('singleUser', {
    name: val[0].name,
    email: val[0].email,
    pages: val[1]
  })
})
.catch(next);
})

router.get('/:urlTitle', function (req, res, next) {

  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(page){
    console.log(page.getAuthor())
    res.render('wikipage', {
      title: page.title,
      content: page.content,
      page:page
    })
  })
  .catch(next);

});


router.post('/', function(req, res, next) {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
  User.findOrCreate({
  where: {
    name: req.body.name,
    email: req.body.email
    }
  })
  .then(function (values) {

  var user = values[0];

  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  return page.save().then(function (page) {
    return page.setAuthor(user);
  });

})
.then(function (page) {
  res.redirect(page.route());
})
.catch(next)
})


// .catch(next);
//   var page = Page.build({
//     title: req.body.title,
//     content: req.body.content
//   });
//   // STUDENT ASSIGNMENT:
//   // make sure we only redirect *after* our save is complete!
//   // note: `.save` returns a promise or it can take a callback.
//   page.save()
//   	.then(function(val){
//   		res.redirect(val.route())
//   	})
// });

module.exports = router;
