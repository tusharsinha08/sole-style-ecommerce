import React from 'react';
import ToggleDarkMode from './ToggleDarkMode';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const navOptions = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/shop'}>Shop</Link></li>
        <li><Link to={'/about'}>About</Link></li>
        <li><Link to={'/contact'}>Contact</Link></li>
    </>

    return (
        <div>
            <div className="navbar px-32 bg-gray-600/50 backdrop-blur-sm backdrop-saturate-50 shadow fixed z-50 text-white mx-auto left-0 right-0">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-white/10 backdrop-blur-sm  rounded-box z-1 mt-3 w-52 p-2 shadow">
                                {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Sole Style</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <ToggleDarkMode></ToggleDarkMode>
                </div>
            </div>
        </div>
    );
};

export default Navbar;