import ToggleDarkMode from './ToggleDarkMode';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";
import useAuth from '../hooks/useAuth';

const Navbar = () => {
    const { signOutUser, user, dbUser } = useAuth();
    const navigate = useNavigate();
    const closeDropdown = () => document.activeElement.blur();

    const navOptions = <>
        <li><Link onClick={closeDropdown} to={'/'}>Home</Link></li>
        <li><Link onClick={closeDropdown} to={'/products'}>Shop</Link></li>
        <li><Link onClick={closeDropdown} to={'/about'}>About</Link></li>
        <li><Link onClick={closeDropdown} to={'/contact'}>Contact</Link></li>
    </>

    const handleLogout = async () => {
        navigate('/login');
        try {
            await signOutUser(); // your auth logout function
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="navbar lg:px-10 bg-gray-100 shadow-lg fixed z-50 text-gray-900 mx-auto dark:text-gray-300 dark:bg-gray-900">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={1}
                            className="menu menu-sm dropdown-content bg-gray-100 rounded-sm z-1 mt-3 w-40 p-2 shadow dark:bg-gray-800 dark:text-gray-300"
                        >
                            {navOptions}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost text-xl">Sole Style</Link>
                </div>
                <div className="navbar-center  hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-semibold space-x-4">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end space-x-4">
                    <ToggleDarkMode></ToggleDarkMode>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button">
                            {dbUser?.image ? (
                                <img
                                    src={dbUser?.image}
                                    alt="User"
                                    className="w-8 h-8 border rounded-full cursor-pointer"
                                />
                            ) : (
                                <FaRegCircleUser
                                    className="text-gray-900 dark:text-gray-300 cursor-pointer"
                                    size={24}
                                />
                            )}
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-gray-100 rounded-sm z-1 mt-4 w-40 p-2 shadow-xl dark:bg-gray-800 dark:text-gray-300"
                        >
                            <li onClick={closeDropdown}>
                                <Link to="my-account/dashboard">Dashboard</Link>
                            </li>

                            <li onClick={closeDropdown}>
                                <Link to="my-account/carts">My Cart</Link>
                            </li>

                            <li onClick={closeDropdown}>
                                <Link to="my-account/orders">My Orders</Link>
                            </li>

                            <li onClick={closeDropdown}>
                                <Link to="my-account/profile">My Profile</Link>
                            </li>

                            <li onClick={closeDropdown}>
                                <Link to="my-account/notifications">Notifications</Link>
                            </li>

                            <div className="divider my-1"></div>

                            <li onClick={closeDropdown}>
                                <button
                                    onClick={handleLogout}
                                    className="text-red-500"
                                >
                                    {user ? "Logout" : "Login"}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;