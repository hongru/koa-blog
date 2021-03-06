

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
    },

    renderRegister: function * () {//console.log('route register')
        var codeMap = {
            "1":"账号已经存在"
        };
        
        var code = this.query['c'];

        yield this.render('register',{
            msg: code && codeMap[code]
        });
    },

    register: function * () {
        var data = this.request.body;
        var user = yield userModel.getUser(data.account);
        if (user) {
            //console.log('用户已存在', user);
            this.redirect('/register?c=1');
        } else {
            yield userModel.saveUser(data);
            this.redirect('/');
        }
    }
};
