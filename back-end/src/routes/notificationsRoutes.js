const express = require("express");

const {
    createNotification,
    getUserNotifications,
    getUnreadCount,
    markAsRead,
    markAllRead,
    deleteNotification,
    deleteAllNotifications,
} = require("../controllers/notificationsController");

const router = express.Router();

router.post("/", createNotification);

router.get("/:email", getUserNotifications);

router.get(
    "/unread-count/:email",
    getUnreadCount
);

router.patch(
    "/mark-read/:id",
    markAsRead
);

router.patch(
    "/mark-all-read/:email",
    markAllRead
);

router.delete(
    "/:id",
    deleteNotification
);

router.delete(
    "/all/:email",
    deleteAllNotifications
);

module.exports = router;