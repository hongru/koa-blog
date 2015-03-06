var _ = require('underscore');
var co = require('co');
var thunkify = require('thunkify-wrap');

var Tag = require('../../db/models/tag');

module.exports = {

	fetch: function *() {
        var fetch = thunkify(Tag.fetch,Tag);
        var tagList = yield fetch();
        return tagList || [];
	},

	findByName: function *(name) {
        var findByName = thunkify(Tag.findByName,Tag);
        var tag = yield findByName(name);
        return tag;
	},

	findById: function *(id) {
        var findById = thunkify(Tag.findById,Tag);
        var tag = yield findById(id);
        return tag;
	},

    linkPost: function * (post) {
        var tagsInfo = yield post.tags.map(function(tag){
            return this.findByName(tag);
        }.bind(this));

        yield tagsInfo.map(function(tag,index){
            var posts = [{
                post:post._id,
                title:post.title
            }];
            if(tag){
                tag.posts = tag.posts.concat(posts);
            } else {
                tag = new Tag({
                    name:post.tags[index],
                    posts:posts
                });
            }
            
            var save = thunkify(tag.save,tag);

            return save();
        });
    },

    unlinkPost: function * (tags,id) {
        tags = yield tags.map(function(tag) {
            return this.findByName(tag);
        }.bind(this));

        console.log(tags)
        yield tags.map(function(tag){
            tag.posts = tag.posts.filter(function(post) {
                return post.post !== id;
            });

            if (!tag.posts.length) {
                var remove = thunkify(tag.remove,tag);
                return remove();
            }
            var save = thunkify(tag.save,tag);
            return save();
        });
    }

};

