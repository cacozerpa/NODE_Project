const {Router} = require('express');
const { createProd, updateProduct, deleteProd,} = require('../helpers/authproduct');
const router = Router();

router.post('/createprod', createProd);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProd);

module.exports = router;