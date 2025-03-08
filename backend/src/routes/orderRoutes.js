const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/orderController');
const { getOrders, deleteOrder } = require("../controllers/orderController");

router.post('/', createOrder);
router.get('/', getOrders);
router.delete('/:id', deleteOrder);

module.exports = router;
