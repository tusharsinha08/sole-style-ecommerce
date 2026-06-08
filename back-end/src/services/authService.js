
const { ObjectId } = require('mongodb');
const { getUsersCollection } = require('../config/db')

const fetchAllUsers = async () => {
    const usersCollection = getUsersCollection();

    // const page = parseInt(queryParams.page) || 1;
    // const limit = parseInt(queryParams.limit) || 10;
    // const skip = (page - 1) * limit;

    // let query = {};

    const result = await usersCollection
        .find({})
        .toArray();

    return result;
};

const createUser = async (userInfo) => {
    const usersCollection = getUsersCollection();

    const result = await usersCollection.insertOne(userInfo)
    return result;
}

const fetchUsersByEmail = async (email) => {
    const usersCollection = getUsersCollection()

    return await usersCollection.findOne({ email })
}

const fetchUserById = async (id) => {
    const usersCollection = getUsersCollection()

    const query = { _id: new ObjectId(id) }

    return await usersCollection.findOne(query)
}

const updateUserDetails = async (user) => {
    const usersCollection = getUsersCollection();

    const { email, ...updateData } = user;

    const result = await usersCollection.updateOne(
        { email },
        {
            $set: {
                ...updateData,
                updatedAt: new Date()
            }
        }
    );

    return result;
};

const adminUpdateUserById = async (id, data) => {
    const usersCollection = getUsersCollection();


    const result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                ...data,
                updatedAt: new Date()
            }
        }
    );

    return result;
};

module.exports = {
    fetchAllUsers,
    createUser,
    fetchUsersByEmail,
    updateUserDetails,
    fetchUserById,
    adminUpdateUserById
}