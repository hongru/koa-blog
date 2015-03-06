var _ = require('underscore');
var co = require('co');
var thunkify = require('thunkify-wrap');

var postModel = require('../models/post');
var tagModel = require('../models/tag');

var tagController = require("./tag");

module.exports = {

    render: function * () {
        if (!this.session.user) {
            this.redirect('/');
            return;
        }

        var tagList = yield tagModel.fetch();

        yield this.render('write',{
            session:this.session,
            post:{},
            tagList:tagList
        });
    },

    show: function * () {
        if (!this.session.user) {
            this.redirect('/');
            return;
        }

        var id = this.params['id'];

        var post = yield postModel.findById(id);

        var tagList = yield tagModel.fetch();

        yield this.render('write',{
            session:this.session,
            post: post,
            tagList:tagList
        });
    },

    addPost: function * () {
        var data = this.request.body;

        var post = yield postModel.save(data);

        yield tagModel.linkPost(post);

        this.status = 200;

        this.body = {
            "code": "S_OK"
        };
    },

    updatePost: function * () {
        var data = this.request.body;
        var id = this.params['id'];

        var post = yield postModel.findById(id);

        yield tagModel.unlinkPost(post.tags,id);

        post = _.extend(post,data);
        
        var update = thunkify(post.save,post);

        post = yield update();
        
        yield tagModel.linkPost(post[0]);

        this.status = 200;

        this.body = {
            "code": "S_OK"
        };
    }
};


