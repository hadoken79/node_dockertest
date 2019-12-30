const
    bcrypt = require('bcrypt'),
    ADMIN_HASH = '$2b$10$vqdAGt51s1lc0kEP7rEB..tcN/u39W/IjMhNNpdcr2mBpsXdrJ8je';


const verifyLogin = (username, password) => {
    if (username !== 'admin') {
        return Promise.resolve(false);
    }
    return bcrypt.compare(password, ADMIN_HASH);

}

module.exports = {
    verifyLogin,
}