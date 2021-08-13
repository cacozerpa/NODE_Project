const {Router} = require('express');
const { createUser, updateUser, deleteUser } = require('../helpers/auth');
const { isAuth } = require('../validations/auth');
const router = Router();

router.post('/create', createUser);
router.put('/updateuser',  isAuth, updateUser);
router.delete('/deleteuser', deleteUser);

module.exports = router;