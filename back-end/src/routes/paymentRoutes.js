const express = require('express');
const router = express.Router();
const { addPaymentStripe, addPayment } = require('../controllers/paymentController');

router.post('/create-payment-intent', addPaymentStripe)

router.post('/', addPayment)

module.exports = router;