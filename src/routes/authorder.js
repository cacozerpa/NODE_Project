const {Router} = require('express');
const { deleteOrder } = require('../helpers/authorder');
const { createOrderDetail } = require('../helpers/authorderdetails');
const router = Router();

router.post('/createorder', createOrderDetail);
router.delete('/orders/:order_id', deleteOrder);

module.exports = router;