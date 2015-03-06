var PostController = require('../app/controllers/post');
var WriteController = require('../app/controllers/write');
var TagController = require('../app/controllers/tag');
var UserController = require('../app/controllers/user');

exports.init = function(app) {

	//首页
	app.get('/', PostController.renderHome);

	//首页
	app.get('/home', PostController.renderHome);

	//列表页
	app.get('/posts/list', PostController.renderList);

	//列表页
	app.get('/posts/page/:page', PostController.renderList);

	//文章详情页
	app.get('/posts/:id', PostController.renderPost);

	//分类文章列表页
	app.get('/tags/:tag', TagController.list);

	//写文章页
	app.get('/write', WriteController.render);

	//编辑文章页
	app.get('/posts/edit/:id', WriteController.show);

	//删除文章
	app.post('/posts/delete', PostController.deletePost);

	//保存文章
	app.post('/posts/write', WriteController.addPost);

	//更新文章
	app.post('/posts/update/:id', WriteController.updatePost);

	//关于我
	app.get('/about', UserController.show);

    //登录页
    app.get('/login', UserController.render);

    //登录
    app.post('/user/login', UserController.login);
};

