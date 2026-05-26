import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const UserHome = () => {
    const { user, signOutUser } = useAuth();
    // console.log(auth);
    console.log("user: ", user)

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "You have been logged out.",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        popup: 'w-56 p-2 text-sm'
                    }
                });
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='mx-auto py-20 items-center max-w-7xl '>
            <h3>wellcome back {user.displayName}</h3>
            <Link to={'/login'} >login</Link>
            <button className='btn'
                onClick={handleSignOut}
            >logout</button>
        </div>
    );
};

export default UserHome;