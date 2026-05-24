const express = require('express');
const router = express.Router();
const Orders = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/adminMiddleware');

router.post('/', protect, Orders.addOrderItems);
router.get('/myorders', protect, Orders.getMyOrders);
router.get('/:id', protect, Orders.getOrderById);
router.put('/:id/pay', protect, Orders.updateOrderToPaid);

// Admin can change Order details
router.put('/:id/deliver', protect, isAdmin, Orders.updateOrderToDelivered);
router.get('/', protect, isAdmin, Orders.getOrders);

module.exports = router;
