import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className='bg-white dark:bg-gray-800'>
                <Outlet></Outlet>
            </div>
        </>
    );
};

export default MainLayout;