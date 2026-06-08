import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import useGreeting from "../hooks/useGreeting";
import useAuth from "../hooks/useAuth";
import { HiMenuAlt1 } from "react-icons/hi";

const AdminLayout = () => {
    const { user } = useAuth();
    const greeting = useGreeting();

    return (
        <div className="max-w-7xl mx-auto min-h-screen bg-white dark:bg-gray-800">

            <div className="drawer md:drawer-open">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

                {/* Main Content */}
                <div className="drawer-content p-4">

                    {/* HEADER BAR */}
                    <div className="flex items-center justify-between mb-4 md:ml-6">

                        {/* Toggle Button (VISIBLE NOW) */}
                        <label
                            htmlFor="dashboard-drawer"
                            className="text-2xl md:hidden"
                        >
                            <HiMenuAlt1></HiMenuAlt1>
                        </label>

                        {/* Greeting */}
                        <div className="text-center md:text-left space-y-1">
                            <h3 className="md:text-xl text-sm font-medium text-gray-500">
                                {greeting}{" "}
                                <span className="font-bold font-cormorant md:text-xl uppercase">
                                    {user?.displayName || "Customer"} 👋
                                </span>
                            </h3>
                        </div>

                        {/* Right side spacer (optional for alignment) */}
                        <div className="w-10 md:hidden"></div>

                    </div>

                    <Outlet />
                </div>

                {/* Sidebar */}
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                    <aside className="w-64 min-h-screen bg-white dark:bg-gray-800 flex flex-col">

                        {/* Brand Header */}
                        <div className="p-4 border-b dark:border-gray-700">
                            <h2 className="text-lg font-bold tracking-wide">
                                SOLE STYLE ADMIN
                            </h2>
                            <p className="text-sm text-gray-400">{user?.email}</p>
                        </div>

                        {/* Menu */}
                        <div className="flex-1 overflow-y-auto">
                            <AdminSidebar />
                        </div>

                    </aside>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;