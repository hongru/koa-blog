

var userModel = require('../models/user');

module.exports = {
    
    show: function * () {
        yield this.render('about',{
            session:this.session
        });
    },

    render: function * () {

        var codeMap = {
            "1":"密码错误"
        };
        
        var code = this.query['c'];

        yield this.render('login',{
            msg: code && codeMap[code]
        });
    },

    login: function * () {
        var data = this.request.body;

        var user = yield userModel.getUser(data.account);
        console.log(user, data);

        if (user && user.password === data.password) {
            this.session.user = user.account;
            this.redirect('/');
        } else {
            this.redirect('/login?c=1');
        }
    }
};
