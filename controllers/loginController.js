const
    userService = require('../services/userService');

const renderLogin = (req, res) => {

    res.render('login', {
        heading: 'Login',
        uname: req.body.username,
        loginActive: true,
        loginFailed: req.body.loginFailed
    });

}

const submitLogin = (req, res) => {


    userService.verifyLogin(req.body.username, req.body.password)
        .then(loginSucess => {
            if (loginSucess) {
                req.session.isLoggedIn = true;
                res.redirect('/settings');
            } else {
                req.body.loginFailed = true;
                renderLogin(req, res);
            }
        })
}

module.exports = {
    renderLogin,
    submitLogin
}