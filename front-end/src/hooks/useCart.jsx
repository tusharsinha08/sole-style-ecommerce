import { useMemo } from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCart = () => {
    const { user } = useAuth()

    const axiosSecure = useAxiosSecure();
    const { refetch, data: carts = [], isPending: isLoading } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`)
            
            return res.data
        }
    })

    const subtotal = useMemo(() => {
            if (user) {
                return carts.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                );
            }
        }, [carts, user]);

    return {carts, refetch, isLoading, subtotal};
};

export default useCart;