const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderByNumber, deleteOrder } = require("../controllers/orderController");

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:orderNumber', getOrderByNumber);
router.delete('/:orderNumber', deleteOrder); 

module.exports = router;
