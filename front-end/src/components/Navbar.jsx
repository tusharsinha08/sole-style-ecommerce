import ToggleDarkMode from './ToggleDarkMode';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";
import useAuth from '../hooks/useAuth';
import useNotification from '../hooks/useNotification';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import useAdmin from '../hooks/useAdmin';
import useScrollToTop from '../hooks/useScrollToTop';


const Navbar = () => {
    const { signOutUser, user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const scrollToTop = useScrollToTop()

    const { data: dbUser = {} } = useQuery({
        queryKey: ['dbUser', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/email/${user?.email}`)
            return res.data;
        }
    })
    const { isAdmin, isAdminLoading } = useAdmin()

    const navigate = useNavigate();
    const { notifications } = useNotification()
    const unreadNotifications = notifications?.filter(
        notification => !notification.read
    );

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { pathname } = useLocation();
    const transparentRoutes = ["/", "/about", "/contact", "/products"];
    const hasBgImage = transparentRoutes.includes(pathname);
    const showSolidBg = scrolled || !hasBgImage;


    const closeDropdown = () => document.activeElement.blur();

    const navOptions = <>
        <li><Link onClick={closeDropdown(), scrollToTop} to={'/'}>Home</Link></li>
        <li><Link onClick={closeDropdown(), scrollToTop} to={'/products'}>Shop</Link></li>
        <li><Link onClick={closeDropdown(), scrollToTop} to={'/about'}>About</Link></li>
        <li><Link onClick={closeDropdown(), scrollToTop} to={'/contact'}>Contact</Link></li>
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
            <div className={`navbar lg:px-10 fixed top-0 left-0 w-full z-50 transition-all duration-300
                ${showSolidBg
                    ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 shadow-"
                    : "bg-transparent text-gray-300"
                }`}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={1}
                            className="menu menu-sm dropdown-content bg-gray-100 rounded-sm z-1 mt-3 w-40 p-2 shadow dark:bg-gray-800 text-gray-900 dark:text-gray-300"
                        >
                            {navOptions}
                        </ul>
                    </div>
                    <Link to={'/'} className='w-32'>
                        <p>
                            <span className='dark:text-white tracking-widest font-bold text-2xl'>Sole</span>
                            <span className='text-cyan-300 font-bold text-2xl'>Style</span>
                        </p>

                        <span className='inline-block text-xs tracking-[0.23em] uppercase text-gray-500'>Clothe Store</span>
                    </Link>
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
                                    className=" cursor-pointer"
                                    size={24}
                                />
                            )}
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content text-gray-900 bg-gray-100 rounded-sm z-1 mt-4 w-40 p-2 shadow-xl dark:bg-gray-800 dark:text-gray-300"
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
                                <Link to="my-account/notifications">
                                    Notifications ({unreadNotifications.length})
                                </Link>
                            </li>

                            { isAdmin && !isAdminLoading &&
                                <>
                                    <div className="divider my-1"></div>

                                    <li onClick={closeDropdown}>
                                        <Link to="admin/dashboard">
                                            Admin Panel
                                        </Link>
                                    </li>
                                </>
                            }

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