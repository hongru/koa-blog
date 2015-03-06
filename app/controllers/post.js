var co = require('co');
var thunkify = require('thunkify-wrap');
var markdown = require('markdown').markdown;

var postModel = require('../models/post');
var tagModel = require('../models/tag');

module.exports = {

    renderHome: function * () {
		var postList = yield postModel.fetch();

		postList = postList.map(function(post) {
			post.content = markdown.toHTML(post.content);
			return post;
		});

		var tagList = yield tagModel.fetch();

		yield this.render('index', {
            session: this.session,
			tagList: tagList,
			postList: postList
		});
	},

	renderList: function * () {
        var postList = yield postModel.fetch();

		postList = postList.map(function(post) {
			post.content = markdown.toHTML(post.content);
			return post;
		});

		var tagList = yield tagModel.fetch();

		yield this.render('list', {
            session: this.session,
			tagList: tagList,
			postList: postList
		});
	},

    renderPost: function * () {
		var id = this.params['id'];
		var post = yield postModel.findById(id);

		post.content = markdown.toHTML(post.content);

        var tagList = yield post.tags.map(function(tag) {
            return tagModel.findByName(tag);
        });

		yield this.render('post', {
            session: this.session,
			tagList: tagList,
			post: post
		});
	},

    deletePost: function * () {
        var id = this.request.body['id'];
        
        var post = yield postModel.del(id);

        var tags = post.tags;

        var result = yield tagModel.unlinkPost(tags,id);

        this.status = 200;
        this.body = {
            "code":"S_OK"
        };
    }
};

