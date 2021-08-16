const {Router} = require('express');
const { getUsers, getUsersById, adminGetUserById } = require('../helpers/user');
const router = Router();

router.get('/users', getUsers);
router.get('/user', getUsersById);
router.get('/user/:id', adminGetUserById);

module.exports = router;