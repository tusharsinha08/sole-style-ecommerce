import React from 'react';
import useOrder from '../../../hooks/useOrder';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllOrders = () => {
    const axiosSecure = useAxiosSecure()
    const {orders} = useOrder()
    // console.log(orders);
    const {data: allOrders = [], refetch, isPending: isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/orders/admin');
            console.log('all:', res.data);
            
            return res.data
        }
    })
    console.log("all orders:", allOrders);
    

    return (
        <div>
            
        </div>
    );
};

export default AllOrders;