import React from 'react';
import useCart from '../../hooks/useCart';

const Dashboard = () => {
    const { carts } = useCart();
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
                        <div className="stat-value text-success">12</div>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Wishlist</div>
                        <div className="stat-value text-secondary">8</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;