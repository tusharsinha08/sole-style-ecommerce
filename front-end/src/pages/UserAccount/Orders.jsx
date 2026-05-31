import React from 'react';
import useOrder from '../../hooks/useOrder';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Orders = () => {
    const { orders, refetch } = useOrder();
    console.log(orders);
    const axiosSecure = useAxiosSecure()

    const handleCancelOrder = async (id) => {
        console.log('order Id:', id);
        await axiosSecure.patch(`/orders/${id}`, { action: 'cancel' })
            .then(res => {
                Swal.fire({
                    title: "Are you sure?",
                    text: "Want to remove the cart",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes",
                    customClass: {
                        popup: 'w-56 p-2 text-sm',
                    }.then(async (result) => {
                        if (result.isConfirmed) {
                            if (res.data.modifiedCount) {
                                Swal.fire({
                                    toast: true,
                                    position: "top-end",
                                    text: "Your order is cancelled",
                                    icon: "success",
                                    showConfirmButton: false,
                                    timer: 2000,
                                    customClass: {
                                        popup: 'w-56 p-1 text-sm'
                                    }
                                });
                                refetch()
                            }
                        }
                    })

                })
            })
    }



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
                                <th>Order Title</th>
                                <th>Products</th>
                                <th>Price</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        {
                            orders.map((order) => (
                                <tbody key={order._id} className='text-gray-400 dark:text-gray-500'>
                                    {/* row 1 */}
                                    <tr>
                                        <td>
                                            <div className="flex items-center gap-3 w-48">
                                                <div>
                                                    <h4 className="font-bold text-gray-900 dark:text-gray-300">{order.customer_name}</h4>
                                                    <p className="text-xs opacity-80">Address: {order.address}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <div className="font-bold">{order.productIds.length}</div>
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