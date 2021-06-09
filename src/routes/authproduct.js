const {Router} = require('express');
const { createProd, UpdateProduct,} = require('../helpers/authproduct');
const router = Router();

router.post('/createprod', createProd);
router.put('/products/:id', UpdateProduct);

module.exports = router;