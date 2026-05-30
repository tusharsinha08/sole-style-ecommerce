import { Link, Outlet } from 'react-router-dom';
import CustomersSidebar from '../components/CustomersSidebar';
import useAuth from '../hooks/useAuth';
import useGreeting from '../hooks/useGreeting';

const CustomerDashboardLayout = () => {
    const {user} = useAuth();
    const greeting = useGreeting();

    return (

        <div className='mx-auto p-12 scroll-px-px min-h-screen bg-white dark:bg-gray-800'>
            <div className='text-center mb-4 space-y-2'>
                <h1 className='text-4xl font-bold dark:text-gray-300'>
                    <Link to={'/'}>Sole Style</Link>
                </h1>
                <h3 className='text-xl font-medium text-gray-500'>
                    {greeting} <span className='font-bold font-cormorant text-xl uppercase'>{user?.displayName || "Customer"} 👋</span>
                </h3>
            </div>
            <div className="drawer lg:drawer-open">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

                {/* Main Content */}
                <div className="drawer-content p-4">
                    <Outlet />
                </div>

                {/* Sidebar */}
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                    <aside className="w-72">
                        {/* Sidebar Content */}
                        <CustomersSidebar></CustomersSidebar>
                    </aside>
                </div>
            </div>
        </div>

    );
};

export default CustomerDashboardLayout;