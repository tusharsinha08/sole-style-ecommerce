const express = require('express');
const { addCart, getCarts, deleteCart, updateCart } = require('../controllers/cartsController');


const router = express.Router();

router.post('/', addCart);

router.get('/', getCarts)

router.delete('/:id', deleteCart)

router.patch('/:id', updateCart)

module.exports = router;