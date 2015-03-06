var _ = require('underscore');
var co = require('co');
var thunkify = require('thunkify-wrap');

var Post = require('../../db/models/post');

module.exports = {

	fetch: function * () {
		var fetch = thunkify(Post.fetch, Post);
		var postList = yield fetch();
		return postList;
	},

	findById: function * (id) {
		var findById = thunkify(Post.findById, Post);
		var post = yield findById(id);
		return post;
	},

	save: function * (data) {
		var post = new Post(data);
		var save = thunkify(post.save, post);

		var result = yield save();
		return result[0];
	},

	update: function * (id, data) {
        var post = yield this.findById(id);

        post = _.extend(post,data);

        var save = thunkify(post.save,post);

		var result = yield save();

		return result;
	},

	del: function * (id) {
		var post = yield this.findById(id);
		var remove = thunkify(post.remove, post);
		var result = yield remove();
		return result;
	}

};

