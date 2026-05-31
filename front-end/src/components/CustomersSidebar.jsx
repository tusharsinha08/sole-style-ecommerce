import {
    FaHome,
    FaShoppingCart,
    FaBoxOpen,
    FaCreditCard,
    FaHeart,
    FaMapMarkerAlt,
    FaUser,
    FaBell,
    FaStar,
    FaCog,
    FaSignOutAlt,
} from "react-icons/fa";

import { NavLink } from "react-router";
import useAuth from "../hooks/useAuth";

const CustomersSidebar = () => {
    const {signOutUser} = useAuth();
    const navClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-sm transition-all
    ${isActive
            ? "bg-black text-primary-content"
            : "hover:bg-gray-300 dark:hover:bg-gray-700"
        }`;
    
    const handleSignOut = () => {
        signOutUser()
    }

    return (
        <div className="flex flex-col text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300">
            {/* Menu */}
            <ul className="flex-1 p-4 space-y-2">
                <li>
                    <NavLink to={"dashboard"} className={navClass}>
                        <FaHome />
                        Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink to="cart" className={navClass}>
                        <FaShoppingCart />
                        My Cart
                    </NavLink>
                </li>

                <li>
                    <NavLink to="orders" className={navClass}>
                        <FaBoxOpen />
                        My Orders
                    </NavLink>
                </li>

                <li>
                    <NavLink to="payment-history" className={navClass}>
                        <FaCreditCard />
                        Payment History
                    </NavLink>
                </li>

                <li>
                    <NavLink to="wishlist" className={navClass}>
                        <FaHeart />
                        Wishlist
                    </NavLink>
                </li>

                <li>
                    <NavLink to="profile" className={navClass}>
                        <FaUser />
                        My Profile
                    </NavLink>
                </li>

                <li>
                    <NavLink to="notifications" className={navClass}>
                        <FaBell />
                        Notifications
                    </NavLink>
                </li>

                <li>
                    <NavLink to="reviews" className={navClass}>
                        <FaStar />
                        Reviews
                    </NavLink>
                </li>
            </ul>

            {/* Logout */}
            <div className="p-4 border-t">
                <button
                    onClick={handleSignOut}
                    className="btn btn-error btn-outline w-full">
                    <FaSignOutAlt />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default CustomersSidebar;