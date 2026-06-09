import React from 'react';
import useCart from '../../hooks/useCart';
import useOrder from '../../hooks/useOrder';
import Orders from './Orders';

const Dashboard = () => {
    const { carts } = useCart();
    const { orders } = useOrder()

    return (
        <div>
            <div className="grid md:grid-cols-2 gap-6 text-gray-900 dark:text-gray-300">
                <div className="stats shadow">
                    <div className="stat">
                        <div className="text-xl font-semibold">Cart Items</div>
                        <div className="stat-value text-primary"> {carts.length} </div>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="text-xl font-semibold">Orders</div>
                        <div className="stat-value text-success">{orders.length}</div>
                    </div>
                </div>

                {/* <div className="stats shadow">
                    <div className="stat">
                        <div className="text-xl font-semibold">Wishlist</div>
                        <div className="stat-value text-secondary">8</div>
                    </div>
                </div> */}
            </div>

            <section className='my-8'>
                <Orders></Orders>
            </section>
        </div>
    );
};

export default Dashboard;