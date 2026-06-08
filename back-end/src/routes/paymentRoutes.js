const express = require('express');
const { addPaymentStripe, addPayment } = require('../controllers/paymentController');
const { verifyToken } = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/create-payment-intent', verifyToken, addPaymentStripe)

router.post('/', verifyToken, addPayment)

module.exports = router;