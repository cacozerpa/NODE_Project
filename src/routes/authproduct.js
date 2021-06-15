const {Router} = require('express');
const { createProd, UpdateProduct, deleteProd,} = require('../helpers/authproduct');
const router = Router();

router.post('/createprod', createProd);
router.put('/products/:id', UpdateProduct);
router.delete('/products/:id', deleteProd);

module.exports = router;