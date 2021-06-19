const {Router} = require('express');
const { createUser, updateUser, deleteUser } = require('../helpers/auth');
const router = Router();

router.post('/create', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;