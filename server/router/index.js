const router = require('express').Router();
const users = require('./users');
const tours = require('./tours');
const posts = require('./posts');
const likes = require('./likes');
const test = require('./test');
const { authController } = require('../controllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
router.use('/tours', tours);
router.use('/posts', posts);
router.use('/likes', likes);
router.use('/test', test);

module.exports = router;
