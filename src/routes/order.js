const {Router} = require('express');
const { getOrders, getOrderById, getOrderByUsername } = require('../helpers/order');
const { isAuth } = require('../validations/auth');
const router = Router();

router.get('/orders', getOrders);
router.get('/orders/:order_id', getOrderById);
router.get('/userorders', isAuth, getOrderByUsername);

module.exports = router;