const { ObjectId } = require("mongodb");
const { getReviewsCollection } = require("../config/db")


const createReview = async (data) => {
    const collection = getReviewsCollection()
    const updatedData =  {
        ...data,
        createdAt: new Date()
    }
    const result = await collection.insertOne(updatedData)

    return result;
}

const getReviewsByProductId = async (productId) => {
    const collection = getReviewsCollection()
    const result = await collection.find({productId}).sort({ createdAt: -1 }).toArray()
    
    return result
}

const deleteReview = async (id) => {
    const collection = getReviewsCollection()
    const find = { _id: new ObjectId(id) }
    const result = await collection.deleteOne(find)

    return result
}

module.exports = {
    createReview,
    getReviewsByProductId,
    deleteReview
}