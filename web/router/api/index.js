var router = require('express').Router();

router.use('/user', require('./user'));
router.use('/pari', require('./pari'));
router.use('/steam', require('./steam'));

module.exports = router;
