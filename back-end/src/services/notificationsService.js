const { ObjectId } = require("mongodb");
const { getNotificationsCollection } = require("../config/db");

const createNotification = async (notification) => {
    const collection = getNotificationsCollection();

    const result = await collection.insertOne({
        ...notification,
        read: false,
        createdAt: new Date(),
    });

    return result;
};

const getUserNotifications = async (email) => {
    const collection = getNotificationsCollection();

    return await collection
        .find({ userEmail: email })
        .sort({ createdAt: -1 })
        .toArray();
};

const markAsRead = async (id) => {
    const collection = getNotificationsCollection();
    
    const result = await collection.updateOne(
        {
            _id: new ObjectId(id),
        },
        {
            $set: {
                read: true,
            },
        }
    );
    
    return result
};


const markAllRead = async (email) => {
    const collection = getNotificationsCollection();

    return await collection.updateMany(
        {
            userEmail: email,
            read: false,
        },
        {
            $set: {
                read: true,
            },
        }
    );
};


const deleteNotification = async (id) => {
    const collection = getNotificationsCollection();

    return await collection.deleteOne({
        _id: new ObjectId(id),
    });
};

const deleteAllNotifications = async (email) => {
    const collection = getNotificationsCollection();

    return await collection.deleteMany({
        userEmail: email,
    });
};

module.exports = {
    createNotification,
    getUserNotifications,
    markAsRead,
    markAllRead,
    deleteNotification,
    deleteAllNotifications
};