const { ObjectId } = require("mongodb")
const { getOrdersCollection } = require("../config/db")

const addOrderDetails = async (orderItem) => {
    const ordersCollection = getOrdersCollection()

    const result = await ordersCollection.insertOne(orderItem)
    return result
}

const getOrdersByEmail = async (email) => {
    const ordersCollection = getOrdersCollection()
    const query = { 'customer.email': email }
    const result = await ordersCollection.find(query).toArray()

    return result
}

const getOrderById = async (id) => {
    const collection = getOrdersCollection()
    const query = { _id: new ObjectId(id) }
    const result = await collection.findOne(query)

    return result
}

const getAllOrdersForAdmin = async ({
    city,
    status,
    sort
}) => {

    const collection = getOrdersCollection();

    const query = {};

    if (city) {
        query["shippingAddress.city"] = city;
    }

    if (status) {
        query.orderStatus = status;
    }

    const sortOption = {};

    if (sort === "oldest") {
        sortOption.updatedAt = 1;
    } else {
        sortOption.updatedAt = -1;
    }

    const result = await collection
        .find(query)
        .sort(sortOption)
        .toArray();

    return result;
};

// const getAllOrdersForAdmin = async () => {
//     const collection = getOrdersCollection()
//     const result = await collection
//         .find()
//         .sort({ createdAt: -1 })
//         .toArray()

//     return result;
// }

const updateOrderById = async (id, action) => {
    const ordersCollection = getOrdersCollection()
    const query = { _id: new ObjectId(id) }
    const orderItem = await ordersCollection.findOne(query)

    let updateStatus;

    if (action === 'cancelOrder') {
        updateStatus = {
            $set: {
                orderStatus: 'cancelled',
                updatedAt: new Date()
            }
        };
    } else {
        updateStatus = {
            $set: {
                orderStatus: action,
                updatedAt: new Date()
            }
        };
    }

    const result = await ordersCollection.updateOne(query, updateStatus)

    return result
}

const updateOrderByAdmin = async (id, data) => {
    const ordersCollection = getOrdersCollection();

    const query = {
        _id: new ObjectId(id)
    };

    const updateDoc = {
        $set: {
            customer: data.customer,
            shippingAddress: data.shippingAddress,
            paymentStatus: data.paymentStatus,
            orderStatus: data.orderStatus,
            updatedAt: new Date()
        }
    };

    const result = await ordersCollection.updateOne(query, updateDoc);

    return result;
};

const deleteOrderById = async (id) => {
    const collection = getOrdersCollection();

    const query = {
        _id: new ObjectId(id)
    };

    const result = await collection.deleteOne(query);

    return result;
};

module.exports = {
    addOrderDetails,
    getOrdersByEmail,
    updateOrderById,
    getAllOrdersForAdmin,
    deleteOrderById,
    getOrderById,
    updateOrderByAdmin
}