import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useOrder = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const { refetch, data: orders = [], isPending: isLoading } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?email=${user?.email}`)
            
            return res.data
        }
    })

    return {refetch, orders, isLoading}
};

export default useOrder;