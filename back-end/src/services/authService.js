
const { getUsersCollection } = require('../config/db')

const fetchAllUsers = async (queryParams) => {
    const usersCollection = getUsersCollection();

    const page = parseInt(queryParams.page) || 1;
    const limit = parseInt(queryParams.limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};



    const result = await usersCollection
        .find({})
        .skip(skip)
        .limit(limit)
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

module.exports = {
    fetchAllUsers,
    createUser,
    fetchUsersByEmail,
    updateUserDetails
}