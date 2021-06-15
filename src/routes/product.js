const {Router} = require('express');
const { getProducts, getProductsById } = require('../helpers/product');
const router = Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductsById);

module.exports = router;