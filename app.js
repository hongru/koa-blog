var path = require('path');

var koa = require('koa');
var router = require('koa-router');
var render = require('koa-views');
var static = require('koa-static');
var bodyParser = require('koa-bodyparser');
var mongoose = require('mongoose');
var session = require('koa-session-store');
var mongooseStore = require('koa-session-mongoose');

var routes = require('./config/routes');

var app = koa();

mongoose.connect('mongodb://localhost/Blog');

var db = mongoose.connection;

app.keys = ['koa','blog'];

app.use(session({
    store: mongooseStore.create(),
    collection: 'koaSessions',
    connection: db,
    expires: 30 * 60 * 1000,
    model: 'KoaSession'
}));


app.use(static(path.join(__dirname, "/public")));

app.use(render(path.join(__dirname,"./app/views"),{default:"ejs"}));

app.use(bodyParser());

app.use(router(app));

routes.init(app);

app.listen(3000);

