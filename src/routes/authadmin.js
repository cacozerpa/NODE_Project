const {Router} = require('express');
const { createAdmin } = require('../helpers/authadmin');
const router = Router();

router.post('/createadmin', createAdmin);

module.exports = router;