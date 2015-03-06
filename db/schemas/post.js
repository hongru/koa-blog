var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
	title: String,
	content: String,
	tags: [String],
	commets: String,
	id: String,
	meta: {
		createAt: {
			type: Date,
		default:
			Date.now()
		},
		updateAt: {
			type: Date,
		default:
			Date.now()
		}
	}
});

PostSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next && next();
});

PostSchema.statics = {

	fetch: function(cb) {
		return this.find({}, cb);
	},

	findById: function(id, cb) {
		return this.findOne({ _id: id }, cb);
	}

};

module.exports = PostSchema;

