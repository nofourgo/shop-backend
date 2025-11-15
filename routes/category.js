const express = require('express');
const router = express.Router();
const { getListCategory, getCategoryByUrl } = require('../controllers/categoryController');

router.get('/GetListCategory', getListCategory);
router.get('/GetCategoryByUrl', getCategoryByUrl);

module.exports = router;
