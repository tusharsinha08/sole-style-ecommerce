const { getContactsCollection } = require("../config/db")

const addContactDetails = async (data) => {
    const collection = getContactsCollection()
    const result = await collection.insertOne({
        ...data,
        status: 'unread',
        createdAt: new Date()
    })

    return result;
}

module.exports = {
    addContactDetails
}