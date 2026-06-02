import React from 'react';
import useCart from '../../hooks/useCart';
import useOrder from '../../hooks/useOrder';

const Dashboard = () => {
    const { carts } = useCart();
    const { orders } = useOrder()

    return (
        <div>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Cart Items</div>
                        <div className="stat-value text-primary"> {carts.length} </div>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Orders</div>
                        <div className="stat-value text-success">{orders.length}</div>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Wishlist</div>
                        <div className="stat-value text-secondary">8</div>
                    </div>
                </div>
            </div>
            <div className='text-gray-900 dark:text-gray-300 mt-10'>
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
                                                        <div className="text-xs">{order.transactionId}</div>
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
        </div>
    );
};

export default Dashboard;