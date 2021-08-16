const {Router} = require('express');
const { createUser, updateUser, deleteUser, adminUpdateUser } = require('../helpers/auth');
const { isAuth } = require('../validations/auth');
const router = Router();

router.post('/create', createUser);
router.put('/updateuser',  isAuth, updateUser);
router.put('/adminupdateuser/:id', isAuth, adminUpdateUser);
router.delete('/deleteuser/:id', deleteUser);

module.exports = router;