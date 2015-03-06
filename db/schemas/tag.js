
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TagSchema = new Schema({
	name: String,
    posts: [{
        post:String,
        title:String
    }],
	meta: {
		createAt: {
			type: Date,
            default: Date.now()
		},
		updateAt: {
			type: Date,
            default: Date.now()
		}
	}
});

TagSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next && next();
});

TagSchema.statics = {

	fetch: function(cb) {
		return this.find({}, cb);
	},

	findByName: function(name, cb) {
		return this.findOne({ name: name }, cb);
	},

	findById: function(id, cb) {
		return this.findOne({ _id: id }, cb);
	}
};

module.exports = TagSchema;

