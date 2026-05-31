const { ObjectId } = require("mongodb")
const { getOrdersCollection } = require("../config/db")

const addOrderDetails = async (orderItem) => {
    const ordersCollection = getOrdersCollection()

    const result = await ordersCollection.insertOne(orderItem)
    return result
}

const getOrdersByEmail = async (email) => {
    const ordersCollection = getOrdersCollection()
    const query = { email: email }
    const result = await ordersCollection.find(query).toArray()

    return result
}

const updateOrderById = async (id, action) => {
    const ordersCollection = getOrdersCollection()
    const query = { _id: new ObjectId(id)}
    const orderItem = await ordersCollection.findOne(query)

    let updateStatus;
    
    if (action === 'cancel') {
        updateStatus = {
            $set: {
                orderStatus: 'cancelled',
                updatedAt: new Date()
            }
        };
    }

    const result = await ordersCollection.updateOne(query, updateStatus)

    return result
}

module.exports = {
    addOrderDetails,
    getOrdersByEmail,
    updateOrderById
}