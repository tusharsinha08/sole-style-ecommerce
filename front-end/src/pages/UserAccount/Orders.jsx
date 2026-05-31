import React from 'react';
import useOrder from '../../hooks/useOrder';

const Orders = () => {
    const {orders, refetch} = useOrder()

    return (
        <div className='p-20'>
            {orders.length}
        </div>
    );
};

export default Orders;