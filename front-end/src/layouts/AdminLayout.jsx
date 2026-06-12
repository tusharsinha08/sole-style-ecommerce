import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import useAuth from "../hooks/useAuth";
import { HiMenuAlt1 } from "react-icons/hi";

const AdminLayout = () => {
    const { user } = useAuth();

    return (
        <section className=" bg-white dark:bg-gray-800">
            <div className="h-full max-w-7xl mx-auto">
                <div className="drawer md:drawer-open">
                    <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

                    {/* Main Content */}
                    <div className="drawer-content">

                        {/* HEADER BAR */}
                        <div className="flex items-center justify-between">

                            {/* Toggle Button (VISIBLE NOW) */}
                            <label
                                htmlFor="dashboard-drawer"
                                className="text-3xl p-4 dark:text-gray-300 text-gray-900 md:hidden"
                            >
                                <HiMenuAlt1></HiMenuAlt1>
                            </label>

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
                                <h2 className="text-lg font-bold tracking-wide text-gray-900 dark:text-gray-300">
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
        </section>
    );
};

export default AdminLayout;