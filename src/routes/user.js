const {Router} = require('express');
const { getUsers, getUsersById } = require('../helpers/user');
const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUsersById);

module.exports = router;