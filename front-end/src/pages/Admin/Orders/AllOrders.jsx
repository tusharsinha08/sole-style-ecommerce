import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllOrders = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: orders = [],
        isPending,
        refetch,
    } = useQuery({
        queryKey: ["admin-orders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/orders/admin");
            return res.data;
        },
    });

    const handleStatusChange = async (id, status) => {
        try {
            await axiosSecure.patch(`/orders/${id}`, {
                action: status,
            });

            Swal.fire({
                icon: "success",
                title: "Order Updated",
                timer: 1500,
                showConfirmButton: false,
            });

            refetch();
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Update Failed",
            });
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Delete Order?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
        });

        if (!result.isConfirmed) return;

        try {
            await axiosSecure.delete(`/orders/${id}`);

            Swal.fire({
                icon: "success",
                title: "Deleted Successfully",
                timer: 1500,
                showConfirmButton: false,
            });

            refetch();
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Delete Failed",
            });
        }
    };

    if (isPending) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="bg-base-100 rounded-xl shadow">
            <div className="p-5 border-b">
                <h2 className="text-2xl font-bold">
                    All Orders ({orders.length})
                </h2>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Customer</th>
                            <th>Shipping</th>
                            <th>Products</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id}>
                                <td>{index + 1}</td>

                                {/* CUSTOMER */}
                                <td>
                                    <div>
                                        <h4 className="font-semibold">
                                            {order.customer?.name}
                                        </h4>

                                        <p className="text-xs text-gray-500">
                                            {order.customer?.email}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            {order.customer?.phone}
                                        </p>
                                    </div>
                                </td>

                                {/* SHIPPING */}
                                <td>
                                    <div>
                                        <p>
                                            {order.shippingAddress?.district}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            {order.shippingAddress?.city}
                                        </p>
                                    </div>
                                </td>

                                {/* PRODUCTS */}
                                <td>
                                    <span className="badge badge-neutral">
                                        {order.products?.length}
                                    </span>
                                </td>

                                {/* PAYMENT */}
                                <td>
                                    <div className="space-y-1">
                                        <p className="font-medium text-sm">
                                            {order.paymentMethod}
                                        </p>

                                        <div
                                            className={`badge badge-sm ${
                                                order.paymentStatus === "paid"
                                                    ? "badge-success"
                                                    : "badge-warning"
                                            }`}
                                        >
                                            {order.paymentStatus}
                                        </div>

                                        <p
                                            className="text-xs max-w-[100px] truncate"
                                            title={order.transactionId}
                                        >
                                            {order.transactionId}
                                        </p>
                                    </div>
                                </td>

                                {/* STATUS */}
                                <td>
                                    <select
                                        className="border rounded-lg p-1 select-sm"
                                        value={order.orderStatus}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                order._id,
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="pending">
                                            Pending
                                        </option>

                                        <option value="confirmed">
                                            Confirmed
                                        </option>

                                        <option value="processing">
                                            Processing
                                        </option>

                                        <option value="shipped">
                                            Shipped
                                        </option>

                                        <option value="delivered">
                                            Delivered
                                        </option>

                                        <option value="cancelled">
                                            Cancelled
                                        </option>
                                    </select>
                                </td>

                                {/* TOTAL */}
                                <td>
                                    <span className="font-bold">
                                        ৳ {order.totalPrice}
                                    </span>
                                </td>

                                {/* ACTIONS */}
                                <td>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="text-xl cursor-pointer text-gray-900 hover:text-gray-800"
                                        >
                                            <FaEdit />
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(order._id)
                                            }
                                            className="text-red-500 text-xl hover:text-red-700 cursor-pointer"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllOrders;