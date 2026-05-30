const { addCartDetails, getCartsByEmail, deleteCartById, updateCartByAction  } = require("../services/cartsService");


const addCart = async (req, res) => {
    const cartItem = req.body;

    try {
        if (!cartItem) {
            return res.status(400).send({
                message: 'Cart item is required'
            });
        }

        const result = await addCartDetails(cartItem)

        res.send(result)
    } catch (error) {
        console.error(error);

        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
}

const getCarts = async (req, res) => {
    const email = req.query.email;
    const result = await getCartsByEmail(email)

    res.send(result)
}

const updateCart = async (req, res) => {
    const id = req.params.id
    const { action } = req.body

    const result = await updateCartByAction(id, action)

    res.send(result)
}

const deleteCart = async (req, res) => {
    const id = req.params.id;
    const result = await deleteCartById(id)

    res.send(result)
}


module.exports = {
    addCart,
    getCarts,
    deleteCart,
    updateCart
}