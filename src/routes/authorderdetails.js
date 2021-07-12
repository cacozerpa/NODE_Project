const {Router} = require('express');
const {  createOrderDetail } = require('../helpers/authorderdetails');
const router = Router();

router.post('/createorderdetail/:order_id', createOrderDetail);

module.exports = router;