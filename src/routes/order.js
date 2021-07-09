const {Router} = require('express');
const { getOrders, getOrderById } = require('../helpers/order');
const router = Router();

router.get('/orders', getOrders);
router.get('/orders/:order_id', getOrderById);

module.exports = router;