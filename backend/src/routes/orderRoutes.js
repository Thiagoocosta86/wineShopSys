const express = require('express');
const router = express.Router();
const { createOrder, getOrders, deleteOrder } = require("../controllers/orderController");

router.post('/', createOrder);
router.get('/', getOrders);
router.delete('/:orderNumber', deleteOrder); 

module.exports = router;
