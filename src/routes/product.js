const {Router} = require('express');
const { getProducts, getProductsById } = require('../helpers/product');
const router = Router();

router.get('/users', getProducts);
router.get('/users/:id', getProductsById);

module.exports = router;