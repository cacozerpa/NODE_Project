const {Router} = require('express');
const { CreateUser,UpdateUser,DeleteUser } = require('../helpers/auth');
const router = Router();

router.post('/create', CreateUser);
router.put('/users/:id', UpdateUser);
router.delete('/users/:id', DeleteUser);

module.exports = router;