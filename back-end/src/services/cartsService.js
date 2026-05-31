const { ObjectId } = require("mongodb")
const { getCartsCollection } = require("../config/db")

const addCartDetails = async (cartItem) => {
    const cartsCollection = getCartsCollection()

    const result = await cartsCollection.insertOne(cartItem)
    return result
}

const getCartsByEmail = async (email) => {
    const cartsCollection = getCartsCollection()
    const query = { email: email }
    const result = await cartsCollection.find(query).toArray()

    return result
}

const updateCartByAction = async (id, action) => {
    const cartsCollection = getCartsCollection()
    const filter = { _id: new ObjectId(id) }

    // get current cart item
    const cartItem = await cartsCollection.findOne(filter);

    if (!cartItem) {
        return { success: false, message: 'Cart item not found' };
    }

    const price = cartItem.price;

    let updateOperation
    if (action === 'increment') {
        updateOperation = {
            $inc: {
                quantity: 1,
                totalPrice: price
            }
        }
    } else if (action === 'decrement') {
        updateOperation = {
            $inc: {
                quantity: -1,
                totalPrice: -price
            }
        }
    } else {
        return res.status(400).send({ error: 'Invalid action' })
    }


    const result = await cartsCollection.updateOne(filter, updateOperation)

    if (result.modifiedCount > 0) {
        const updatedCart = await cartsCollection.findOne(filter)
        return { success: true, data: updatedCart }
    } else {
        return { success: false, message: 'Update failed' }
    }
}

const deleteCartById = async (id) => {
    const cartsCollection = getCartsCollection()
    const query = { _id: new ObjectId(id) }
    const result = await cartsCollection.deleteOne(query)

    return result
}

const deleteManyCartsById = async (cartIds) => {
    const cartsCollection = getCartsCollection();



    const query = {
        _id: {
            $in: cartIds.map(id => new ObjectId(id))
        }
    };

    return await cartsCollection.deleteMany(query);
};

module.exports = {
    addCartDetails,
    getCartsByEmail,
    deleteCartById,
    updateCartByAction,
    deleteManyCartsById
}