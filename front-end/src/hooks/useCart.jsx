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

    return {carts, refetch, isLoading};
};

export default useCart;