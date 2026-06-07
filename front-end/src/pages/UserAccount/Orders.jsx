import React from 'react';
import useOrder from '../../hooks/useOrder';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Orders = () => {
    const { orders, refetch } = useOrder();
    console.log(orders);
    const axiosSecure = useAxiosSecure()

    const handleCancelOrder = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Want to cancel this order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosSecure.patch(`/orders/${id}`, {
                        action: 'cancel'
                    });

                    if (response.data.modifiedCount > 0) {
                        await refetch();

                        Swal.fire({
                            toast: true,
                            position: "top-end",
                            icon: "success",
                            title: "Order cancelled successfully",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                    }
                } catch (error) {
                    console.error(error);

                    Swal.fire({
                        icon: "error",
                        title: "Failed to cancel order",
                    });
                }
            }
        });
    };



    return (
        <div className='text-gray-900 dark:text-gray-300'>
            <div className=''>
                <p className='text-xl font-bold'>Total Orders: {orders.length}</p>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table dark:text-gray-300">
                        {/* head */}
                        <thead>
                            <tr className='dark:text-gray-400'>
                                <th></th>
                                <th>Order Title</th>
                                <th>Products</th>
                                <th>Price</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        {
                            orders.map((order, index) => (
                                <tbody key={order._id} className='text-gray-400 dark:text-gray-500'>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-3 w-48">
                                                <div>
                                                    <h4 className="font-bold text-gray-900 dark:text-gray-300">{order.customer.name}</h4>
                                                    <p className="text-xs opacity-80">Address: {order.shippingAddress.address}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <div className="font-bold">{order.products.length}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <div className="font-bold">৳ {order.totalPrice}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <div className="font-bold">{order.paymentStatus}</div>
                                                    <div className="text-xs">{order.paymentMethod}</div>
                                                    <div className="text-xs">{order.transactionId}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <div className="font-bold">{order.orderStatus}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <button
                                                        disabled={(order.paymentStatus && order.orderStatus) !== 'pending'}
                                                        onClick={() => handleCancelOrder(order._id)}
                                                        className={`font-bold cursor-pointer disabled:${order.paymentStatus !== 'pending'} disabled:cursor-not-allowed text-red-500`}>
                                                        cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            ))
                        }
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;