const express = require('express');
const router = express.Router();
const { getProductByCategorySlug, getProductByUrl, getProductByFilters,getRelatedProducts } = require('../controllers/productController');

router.get('/GetProductByCategorySlug', getProductByCategorySlug);
router.get('/GetProductByFilters', getProductByFilters);
router.get('/GetProductByUrl', getProductByUrl);
router.get('/GetRelatedProducts', getRelatedProducts);

module.exports = router;
