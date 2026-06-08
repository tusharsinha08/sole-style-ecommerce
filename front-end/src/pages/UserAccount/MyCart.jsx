import React from 'react';
import useCart from '../../hooks/useCart';
import { MdDeleteForever } from 'react-icons/md';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyCart = () => {
    const { carts, refetch, subtotal, isLoading } = useCart();
    const axiosSecure = useAxiosSecure();
    console.log(carts);

    // Increase quantity with optimistic update
    const handleIncrease = async (id) => {
        try {
            // Method 1: Send only the action (if backend supports it)
            const response = await axiosSecure.patch(`/carts/${id}`, { action: 'increment' });

            if (response.data.success) {
                await refetch(); // Refetch to get fresh data
            }
        } catch (error) {
            console.error('Error increasing quantity:', error);
            Swal.fire({
                title: "Error!",
                text: "Failed to update quantity. Please try again.",
                icon: "error",
                timer: 2000
            });
        }
    };

    // Decrease quantity with optimistic update
    const handleDecrease = async (id) => {
        const cartItem = carts.find(item => item._id === id);

        // Prevent quantity going below 1
        if (cartItem.quantity <= 1) {
            handleRemove(id)
            return;
        }

        try {
            // Method 1: Send only the action (if backend supports it)
            const response = await axiosSecure.patch(`/carts/${id}`, { action: 'decrement' });

            if (response.data.success) {
                await refetch(); // Refetch to get fresh data
            }
        } catch (error) {
            console.error('Error decreasing quantity:', error);
            Swal.fire({
                toast: true,
                title: "Error!",
                text: "Failed to update quantity. Please try again.",
                icon: "error",
                timer: 2000
            });
        }
    };

    // Remove item
    const handleRemove = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Want to remove the cart",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            customClass: {
                popup: 'w-56 p-2 text-sm',
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosSecure.delete(`/carts/${id}`);
                    if (response.data.deletedCount > 0) {
                        await refetch();
                        Swal.fire({
                            toast: true,
                            position: "top-end",
                            text: "Item has been removed from cart.",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2000,
                            customClass: {
                                popup: 'w-56 p-1 text-sm'
                            }
                        });
                    }
                } catch (error) {
                    console.error('Error removing item:', error);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to remove item. Please try again.",
                        icon: "error"
                    });
                }
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <progress className="progress w-56"></progress>
            </div>
        );
    }

    return (
        <div className='text-gray-900 dark:text-gray-300'>
            <div className=''>
                <p className='text-xl font-bold'>Total Carts: {carts.length}</p>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table dark:text-gray-300">
                        {/* head */}
                        <thead>
                            <tr className='dark:text-gray-400'>
                                <th></th>
                                <th>Product</th>
                                <th>Details</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>

                        {
                            carts.map((item, index) => (
                                <tbody key={item._id} className='text-gray-400 dark:text-gray-500'>
                                    {/* row 1 */}
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-3 w-48">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                />
                                                <h4 className="font-bold text-gray-900 dark:text-gray-300">{item.name}</h4>

                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        <b>Size:</b> {item.size} <b>Color:</b> {item.color}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                {/* Bottom */}
                                                <div className="flex items-center justify-between mt-3">
                                                    {/* Quantity */}
                                                    <div className="flex items-center">
                                                        <button
                                                            onClick={() => handleDecrease(item._id)}
                                                            className="w-8 border dark:border-gray-600 dark:text-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            -
                                                        </button>

                                                        <div className="w-10 text-center border-y dark:border-gray-600 dark:text-gray-300">
                                                            {item.quantity}
                                                        </div>

                                                        <button
                                                            onClick={() => handleIncrease(item._id)}
                                                            className="w-8 border dark:border-gray-600 dark:text-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className='font-bold'>৳ {item.price * item.quantity}</p>
                                        </td>
                                        <td>
                                            <div className='flex gap-2 justify-center'>
                                                <button className='btn'>Edit</button>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => handleRemove(item._id)}
                                                        className="text-red-500 hover:text-red-700 disabled:opacity-50"
                                                    >
                                                        <MdDeleteForever className="text-2xl" />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            ))
                        }
                    </table>

                </div>
                {carts.length &&
                    <div className='flex justify-end items-center gap-4'>
                        <p className="flex justify-end gap-4 font-bold text-gray-600 dark:text-gray-400">
                            <span>Subtotal:</span>
                            <span className="text-gray-800 dark:text-gray-200">৳ {subtotal}</span>
                        </p>
                        <button
                            className="flex justify-end w-fit px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                            disabled={carts.length === 0 || isLoading}
                        >
                            <Link to={'/check-out'}>Checkout</Link>
                        </button>
                    </div>
                }

            </div>
        </div>
    );
};

export default MyCart;