const notificationsService = require("../services/notificationsService");


const createNotification = async (req, res) => {
    try {
        const result = await notificationsService.createNotification(req.body);
        
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};

const getUserNotifications = async (req, res) => {
    try {
        const { email } = req.params;

        const result = await notificationsService.getUserNotifications(email);

        res.send(result);
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};

const getUnreadCount = async (req, res) => {
    try {
        const { email } = req.params;

        const count = await notificationsService.getUnreadCount(email);

        res.send({ unreadCount: count });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};

const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        
        const result = await notificationsService.markAsRead(id);
        
        res.send(result);
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};

const markAllRead = async (req, res) => {
    try {
        const { email } = req.params;

        const result = await notificationsService.markAllRead(email);

        res.send(result);
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};


const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await notificationsService.deleteNotification(id);

        res.send(result);
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};

const deleteAllNotifications = async (req, res) => {
    try {
        const { email } = req.params;

        const result = await notificationsService.deleteAllNotifications(email);

        res.send(result);
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};


module.exports = {
    createNotification,
    getUserNotifications,
    getUnreadCount,
    markAsRead,
    markAllRead,
    deleteNotification,
    deleteAllNotifications
};