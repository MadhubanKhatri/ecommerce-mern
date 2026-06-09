const express = require('express');
const router = express.Router();
const paymentControllers = require("../controllers/paymentController");
// const { protect } = require('../middlewares/authMiddleware');

router.post('/payment-handller', paymentControllers.paymentHandller);
router.get('/get-key', paymentControllers.getRazorpayKey);
router.post('/paymentVerification', paymentControllers.paymentVerification)

module.exports = router;
