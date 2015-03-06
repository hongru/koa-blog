
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    account:String,
    password:String,
    resume:{
        nickname:String,
        weibo:String,
        email:String,
        school:String,
        company:String,
        work:String,
        github:String
    }
});

UserSchema.statics = {

	findByName: function(name, cb) {
		return this.findOne({ account: name }, cb);
	}

};

module.exports = UserSchema;


