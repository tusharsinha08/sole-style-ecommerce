import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaHome, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { FaBoxOpen, FaMoneyBill, FaUser } from "react-icons/fa6";

const AdminSidebar = () => {
    const { signOutUser } = useAuth();
    const navigate = useNavigate();
    const navClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-sm transition-all
    ${isActive
            ? "bg-black text-primary-content"
            : "hover:bg-gray-300 dark:hover:bg-gray-700"
        }`;

    const handleSignOut = () => {
        signOutUser()
        navigate('/login')
    }

    return (
        <div className="h-full text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800">

            <ul className="p-4 space-y-2">

                <li>
                    <NavLink to="dashboard" className={navClass}>
                        <FaHome />
                        Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink to="orders" className={navClass}>
                        <FaBoxOpen />
                        Orders
                    </NavLink>
                </li>

                <li>
                    <NavLink to="users" className={navClass}>
                        <FaUser />
                        Users
                    </NavLink>
                </li>

                <li>
                    <NavLink to="products" className={navClass}>
                        <FaBoxOpen />
                        Products
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

export default AdminSidebar;