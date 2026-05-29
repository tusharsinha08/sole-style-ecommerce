const express = require('express');
const { addCarts, getCarts, deleteCart, updateCart } = require('../controllers/cartsController');


const router = express.Router();

router.post('/', addCarts);

router.get('/', getCarts)

router.delete('/:id', deleteCart)

router.patch('/:id', updateCart)

module.exports = router;