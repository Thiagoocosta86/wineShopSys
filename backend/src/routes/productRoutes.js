const express = require('express');
const router = express.Router();
const { getProducts, addProduct, updateProduct, deleteProduct, getProductById, updateProductStock } = require('../controllers/productController');

router.get('/', getProducts);
router.get("/:id", getProductById);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.patch('/:id/stock', updateProductStock);
router.delete('/:id', deleteProduct);

module.exports = router;
