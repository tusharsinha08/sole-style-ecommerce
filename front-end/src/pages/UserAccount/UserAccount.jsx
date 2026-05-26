import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const UserAccount = () => {
    const auth = useAuth();
    console.log(auth);
    
    return (
        <div className='mx-auto py-20 items-center max-w-7xl '>
            <h3>wellcome back </h3>
            <Link to={'/login'} >login</Link>
        </div>
    );
};

export default UserAccount;