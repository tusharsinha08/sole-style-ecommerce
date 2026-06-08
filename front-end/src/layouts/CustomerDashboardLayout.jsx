import { Link, Outlet } from 'react-router-dom';
import CustomersSidebar from '../components/CustomersSidebar';
import useAuth from '../hooks/useAuth';
import useGreeting from '../hooks/useGreeting';

const CustomerDashboardLayout = () => {
    const { user } = useAuth();
    const greeting = useGreeting();

    return (

        <div className='max-w-7xl mx-auto pt-16 scroll-px-px min-h-screen bg-white dark:bg-gray-800'>
            <div className="drawer md:drawer-open">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

                {/* Main Content */}
                <div className="drawer-content p-4">
                    <div className='text-center md:text-left mb-4 space-y-2'>
                        <h3 className='md:text-xl font-medium text-gray-500'>
                            {greeting} <span className='font-bold font-cormorant uppercase'>{user?.displayName || "Customer"} 👋</span>
                        </h3>
                    </div>

                    <Outlet />
                </div>

                {/* Sidebar */}
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                    <aside className="w-64 min-h-screen bg-white dark:bg-gray-800 flex flex-col">

                        {/* Top section */}
                        <div className="p-4 border-b dark:border-gray-700">
                            <h2 className="text-lg font-bold dark:text-gray-300">User Panel</h2>
                            <p className="text-sm text-gray-400">{user?.email}</p>
                        </div>

                        {/* Sidebar menu (scrollable) */}
                        <div className="flex-1 overflow-y-auto">
                            <CustomersSidebar></CustomersSidebar>
                        </div>

                    </aside>
                </div>
            </div>
        </div>

    );
};

export default CustomerDashboardLayout;