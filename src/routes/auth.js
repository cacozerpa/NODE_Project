const {Router} = require('express');
const { CreateUser } = require('../helpers/auth');
const router = Router();

router.post('/create', CreateUser);

module.exports = router;