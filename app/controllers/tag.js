var co = require('co');
var thunkify = require('thunkify-wrap');
var markdown = require('markdown').markdown;

var tagModel = require('../models/tag');

module.exports = {

	list: function * () {
        var tag = this.params['tag'];
        var tagInfo = yield tagModel.findById(tag);

        var tagList = yield tagModel.fetch();

        yield this.render('tags',{
            session:this.session,
            tagInfo:tagInfo,
            tagList:tagList
        });
	},

    add: function * (tag) {
        yield tagModel.save(tag);
    },

    show: function * () {
        
    }

};

