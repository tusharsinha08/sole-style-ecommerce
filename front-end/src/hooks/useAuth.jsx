import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAuth = () => {
    const axiosSecure = useAxiosSecure();
    const auth = useContext(AuthContext)
    const { refetch, data: dbUser = {}} = useQuery({
        queryKey: ['dbUser', auth?.user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/email/${auth?.user?.email}`)
            return res.data;
        }
    })
    

    return {...auth, dbUser, refetch};
};

export default useAuth;