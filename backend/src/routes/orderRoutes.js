const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderByNumber, deleteOrder, createCheckoutSession } = require("../controllers/orderController");

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:orderNumber', getOrderByNumber);
router.delete('/:orderNumber', deleteOrder); 
router.post('/create-checkout-session', createCheckoutSession);

module.exports = router;
