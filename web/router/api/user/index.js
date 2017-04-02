var router = require('express').Router();

router.use('/register', require('./register'));
router.use('/login', require('./authenticate'));

module.exports = router;
