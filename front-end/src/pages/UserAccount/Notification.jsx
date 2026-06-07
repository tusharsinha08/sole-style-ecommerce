import {
    FaBell,
    FaCheckCircle,
    FaTruck,
    FaShoppingBag,
    FaTag,
} from "react-icons/fa";
import useNotification from "../../hooks/useNotification";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Notification = () => {
    const { notifications, isLoading, refetch } = useNotification();
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const markAsRead = async (id) => {

        const res = await axiosSecure.patch(
            `/notifications/mark-read/${id}`
        );

        if (res.data.modifiedCount > 0) {
            refetch();
        }

    };

    const markAllAsRead = async () => {

        const res = await axiosSecure.patch(
            `/notifications/mark-all-read/${user.email}`
        );

        if (res.data.modifiedCount > 0) {
            refetch();
        }

    };

    const unreadCount = notifications.filter(
        (item) => !item.read
    ).length;

    const getIcon = (type) => {
        switch (type) {
            case "order":
                return <FaShoppingBag />;
            case "payment":
                return <FaCheckCircle />;
            case "shipping":
                return <FaTruck />;
            case "promotion":
                return <FaTag />;
            default:
                return <FaBell />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Notifications
                        </h1>

                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            {unreadCount} unread notification
                            {unreadCount !== 1 && "s"}
                        </p>
                    </div>

                    <button
                        onClick={markAllAsRead}
                        className="btn bg-gray-900 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
                    >
                        Mark All as Read
                    </button>
                </div>

                {/* Notification List */}
                <div className="space-y-4">
                    {notifications.map((notification) => (
                        <div
                            key={notification._id}
                            className={`border rounded-xl p-4 transition-all duration-200
              
                            ${notification.read
                                    ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                    : "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div
                                    className={`text-xl mt-1
                  
                                    ${notification.read
                                            ? "text-gray-500"
                                            : "text-blue-600 dark:text-blue-400"
                                        }`}
                                >
                                    {getIcon(notification.type)}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                        <h3
                                            className={`font-semibold
                                            ${notification.read
                                                    ? "text-gray-700 dark:text-gray-200"
                                                    : "text-gray-900 dark:text-white"
                                                }`}
                                        >
                                            {notification.title}
                                        </h3>

                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {notification.time}
                                        </span>
                                    </div>

                                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                                        {notification.message}
                                    </p>

                                    {!notification.read && (
                                        <button
                                            onClick={() =>
                                                markAsRead(notification._id)
                                            }
                                            className="mt-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            Mark as Read
                                        </button>
                                    )}
                                </div>

                                {/* Unread Dot */}
                                {!notification.read && (
                                    <div className="w-3 h-3 rounded-full bg-blue-500 mt-2"></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {notifications.length === 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center">
                        <FaBell className="mx-auto text-5xl text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
                            No Notifications
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            You're all caught up.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notification;