
var thunkify = require('thunkify-wrap');

var User = require('../../db/models/user');

module.exports = {

    saveUser : function * (user) {
        var user = new User(user);

        var save = thunkify(user.save,user);

        yield save();
    },

    getUser : function * (account) {
        var findByName = thunkify(User.findByName,User);

        var result = yield findByName(account);
        return result;
    }
}
