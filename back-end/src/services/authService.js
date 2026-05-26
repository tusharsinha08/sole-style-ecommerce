
const { getUsersCollection } = require('../config/db')

const fetchAllUsers = async () => {
    const usersCollection = getUsersCollection();

    const result = await usersCollection.find({}).toArray();
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

const updateUserName = async (email, name) => {
    const usersCollection = getUsersCollection()

    const result = await usersCollection.updateOnw(
        { email },
        { $set: { name } }
    )

    return result
}

module.exports = {
    fetchAllUsers,
    createUser,
    fetchUsersByEmail,
    updateUserName
}