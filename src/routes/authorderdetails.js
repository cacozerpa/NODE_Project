const {Router} = require('express');
const {  createOrderDetail, deleteOrderDetail } = require('../helpers/authorderdetails');
const router = Router();

router.post('/createorderdetail/:order_id', createOrderDetail);
router.delete('/deletedetail/:id', deleteOrderDetail);

module.exports = router;