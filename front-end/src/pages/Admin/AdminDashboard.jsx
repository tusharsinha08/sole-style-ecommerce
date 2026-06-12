import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useProduct from "../../hooks/useProduct";
import useUsers from "../../hooks/useUsers";

import { FaUsers, FaBox, FaShoppingCart, FaMoneyBill } from "react-icons/fa";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { products, result } = useProduct()
  const axiosSecure = useAxiosSecure()
  const { users = [] } = useUsers();

  const {
    data: orders = [],
    isPending: isLoading,
  } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders/admin");
      return res.data;
    },
  });

  // Revenue calculation (example)
  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order?.totalPrice || 0),
    0
  );

  // Pie chart data (dynamic)
  const chartData = [
    { name: "Users", value: users.length },
    { name: "Products", value: result.totalProducts },
    { name: "Orders", value: orders.length },
  ];

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B"];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 text-gray-900 dark:text-gray-300">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">
          Welcome, {user?.name || "Admin"} 👋
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your store efficiently
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-4 flex items-center gap-4">
          <FaUsers className="text-blue-500 text-3xl" />
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Users</p>
            <h2 className="text-xl font-bold">{users.length}</h2>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-4 flex items-center gap-4">
          <FaBox className="text-green-500 text-3xl" />
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Products</p>
            <h2 className="text-xl font-bold">{result.totalProducts}</h2>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-4 flex items-center gap-4">
          <FaShoppingCart className="text-yellow-500 text-3xl" />
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Orders</p>
            <h2 className="text-xl font-bold">{orders.length}</h2>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-4 flex items-center gap-4">
          <FaMoneyBill className="text-purple-500 text-3xl" />
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Revenue</p>
            <h2 className="text-xl font-bold">৳ {totalRevenue}</h2>
          </div>
        </div>

      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow">

        <h2 className="text-lg font-semibold mb-4">
          Platform Overview
        </h2>

        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;