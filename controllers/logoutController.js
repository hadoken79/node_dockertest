

const logout = (req, res) => {
    if (req.session) {
        delete req.session.isLoggedIn;
    }
    req.session.destroy(() => {
        res.redirect('/home');
    });

}

module.exports = {
    logout
}