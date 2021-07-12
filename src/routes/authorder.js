const {Router} = require('express');
const { createOrder, deleteOrder } = require('../helpers/authorder');
const router = Router();

router.post('/createorder/:id', createOrder);
router.delete('/orders/:id', deleteOrder);

module.exports = router;