const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const nunjucks = require('nunjucks')
const sequelize = require('sequelize')
const models = require('./models');
const server = app.listen(3001, function(){console.log('server listening')});
const wikiRouter = require('./routes/wiki');


app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment 
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);


models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    server.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);

app.use('/wiki', wikiRouter);



