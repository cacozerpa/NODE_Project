const {Router} = require('express');
const {  createOrderDetail } = require('../helpers/authorderdetails');
const router = Router();

router.post('/createorderdetail', createOrderDetail);

module.exports = router;