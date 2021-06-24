const {Router} = require('express');
<<<<<<< Updated upstream
const { createProd, updateProduct, deleteProd,} = require('../helpers/authproduct');
const router = Router();

router.post('/createprod', createProd);
router.put('/products/:id', updateProduct);
=======
const { createProd, UpdateProduct, deleteProd,} = require('../helpers/authproduct');
const router = Router();

router.post('/createprod', createProd);
router.put('/products/:id', UpdateProduct);
>>>>>>> Stashed changes
router.delete('/products/:id', deleteProd);

module.exports = router;