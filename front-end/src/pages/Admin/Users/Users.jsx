import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Users = () => {
    const {user, dbUser} = useAuth();
    console.log(dbUser);
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch, isPending: isLoading} = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            console.log(res.data);
            
            return res.data
        }
    })
    
    return (
        <div>
            <h3>total: {users.length}</h3>
            <h3>name: {user.displayName}</h3>
        </div>
    );
};

export default Users;