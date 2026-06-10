import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaShoppingCart } from 'react-icons/fa';
import CartButton from '../components/CartButton';
import AddToCart from '../components/AddToCart';
import { useState } from 'react';

const MainLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Navbar></Navbar>
            <div className='bg-white dark:bg-gray-800'>
                <Outlet></Outlet>
                {/* Floating Add To Cart Button */}
                <CartButton setIsOpen={setIsOpen}></CartButton>

                {/* Add To Cart Drawer */}
                <AddToCart isOpen={isOpen} setIsOpen={setIsOpen}></AddToCart>
            </div>
            <Footer></Footer>
        </>
    );
};

export default MainLayout;