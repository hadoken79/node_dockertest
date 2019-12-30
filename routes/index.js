const
    router = require('express').Router(),
    newsController = require('../controllers/newsController'),
    settingsController = require('../controllers/settingsController'),
    loginController = require('../controllers/loginController'),
    logoutController = require('../controllers/logoutController'),
    authMiddleware = require('../middleware/authMiddleware');




router.get('/home', newsController.renderHome);
router.get('/', newsController.renderHome);

router.get('/settings', authMiddleware, settingsController.renderSettings);
router.get('/admin', authMiddleware, settingsController.renderSettings);
router.post('/settings', authMiddleware, settingsController.receiveSettings);

router.get('/login', loginController.renderLogin);
router.post('/login', loginController.submitLogin);

router.get('/logout', logoutController.logout);

module.exports = router;