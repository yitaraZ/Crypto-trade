const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.getAllOrders);
router.post('/order_create', orderController.placeOrder);
router.delete('/order_cancel/:id', orderController.cancelOrder);

module.exports = router;