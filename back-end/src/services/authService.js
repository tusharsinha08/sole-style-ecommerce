
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

const updateUserDetails = async (email, name, role) => {
    const usersCollection = getUsersCollection()

    const result = await usersCollection.updateOne(
        { email },
        {
            $set: {
                name,
                role
            }
        }
    )

    return result
}

module.exports = {
    fetchAllUsers,
    createUser,
    fetchUsersByEmail,
    updateUserDetails
}