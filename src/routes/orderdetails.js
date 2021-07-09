const {Router} = require('express');
const { getOrderDetails, getOrderByOrderId } = require('../helpers/orderdetails');
const router = Router();

router.get('/orderdetails', getOrderDetails);
router.get('/ordersdetails/:order_id', getOrderByOrderId);

module.exports = router;