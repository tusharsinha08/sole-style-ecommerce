import { useEffect, useMemo, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import useCart from "../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AddToCart = ({ isOpen, setIsOpen }) => {
    const { carts, refetch, isLoading } = useCart();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation()
    const [guestCarts, setGuestCarts] = useState(() => {
        // Initialize state from localStorage immediately
        const storedCarts = JSON.parse(localStorage.getItem('carts')) || [];
        return storedCarts;
    });

    // Only load from localStorage when isOpen changes (for real-time updates)
    useEffect(() => {
        if (isOpen) {
            const storedCarts = JSON.parse(localStorage.getItem('carts')) || [];
            setGuestCarts(storedCarts);
        }
    }, [isOpen]);


    useEffect(() => {
        if (!user) {
            localStorage.setItem('carts', JSON.stringify(guestCarts));
        }
        console.log(guestCarts);
    }, [guestCarts, user]);


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
                if (!user) {
                    // const storedCart = JSON.parse(localStorage.getItem("carts")) || [];

                    const updatedCart = guestCarts.filter((_, i) => i !== id);

                    console.log("before:", guestCarts);
                    console.log("after:", updatedCart);

                    localStorage.setItem('carts', JSON.stringify(updatedCart));
                    setGuestCarts(updatedCart);

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
                    return;
                }
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

    // Calculate subtotal and total quantity
    const subtotal = useMemo(() => {
        if (user) {
            return carts.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );
        }
        return guestCarts.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    }, [carts, guestCarts, user]);

    const totalQuantity = useMemo(() => {
        if (user) {
            return carts.reduce(
                (total, item) => total + item.quantity,
                0
            );
        }
        return guestCarts.reduce(
            (total, item) => total + item.quantity,
            0
        );
    }, [carts, guestCarts, user]);

    const handleCheckOut = () => {
        if(user) {
            //do something---------

        } else {
            Swal.fire({
                title: "You are not logged in",
                text: "Please login to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            });

        }
    }

    return (
        <div>
            {/* Overlay */}
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
                ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            ></div>

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-[90%] md:w-[420px] bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 flex flex-col
                ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-4xl text-gray-700 dark:text-gray-300"
                    >
                        <IoIosArrowRoundForward />
                    </button>

                    <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">
                        Your Cart
                    </h2>

                    <div className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-200">
                        {totalQuantity}
                    </div>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {isLoading ? (
                        <div className="h-full flex items-center justify-center text-gray-500">
                            Loading...
                        </div>
                    ) : !user ? (
                        guestCarts.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-gray-500">
                                Your cart is empty
                            </div>
                        ) :
                            guestCarts.map((item, index) => (
                                <div
                                    key={`${item._id}-${item.size}-${item.color}`}
                                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-3"
                                >
                                    <div className="flex gap-4">
                                        {/* Image */}
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-24 h-24 object-cover rounded-lg"
                                        />

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        <b>Size:</b> {item.size} <b>Color:</b> {item.color}
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={() => handleRemove(index)}
                                                    className="text-red-500 hover:text-red-700 disabled:opacity-50"
                                                >
                                                    <MdDeleteForever className="text-2xl" />
                                                </button>
                                            </div>

                                            {/* Bottom */}
                                            <div className="flex items-center justify-between mt-3">
                                                {/* Quantity */}

                                                <p className=" text-center dark:border-gray-600 dark:text-gray-300">
                                                    <span className="font-semibold">Items: </span>{item.quantity}
                                                </p>

                                                {/* Price */}
                                                <p className="font-bold text-lg text-gray-800 dark:text-gray-200">
                                                    ৳ {item.price * item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                    ) :

                        carts.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-gray-500">
                                Your cart is empty
                            </div>
                        ) : (
                            carts.map((item) => (
                                <div
                                    key={`${item._id}-${item.size}-${item.color}`}
                                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-3"
                                >
                                    <div className="flex gap-4">
                                        {/* Image */}
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-24 h-24 object-cover rounded-lg"
                                        />

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        <b>Size:</b> {item.size} <b>Color:</b> {item.color}
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={() => handleRemove(item._id)}
                                                    className="text-red-500 hover:text-red-700 disabled:opacity-50"
                                                >
                                                    <MdDeleteForever className="text-2xl" />
                                                </button>
                                            </div>

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

                                                {/* Price */}
                                                <p className="font-bold text-lg text-gray-800 dark:text-gray-200">
                                                    ৳ {item.price * item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between border-b border-gray-300 dark:border-gray-600 pb-2 text-gray-600 dark:text-gray-400">
                            <p>Got a discount code?</p>
                            <input
                                type="text"
                                placeholder="Enter code"
                                className="input input-sm border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg px-3 w-fit"
                            />
                        </div>

                        <p className="flex justify-between font-bold text-gray-600 dark:text-gray-400">
                            <span>Subtotal:</span>
                            <span className="text-gray-800 dark:text-gray-200">৳ {subtotal}</span>
                        </p>
                    </div>

                    <button
                        onClick={handleCheckOut}
                        className="w-full py-3 bg-black text-white rounded-lg hover:opacity-90 transition disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                        disabled={(carts.length === 0 && guestCarts.length === 0) || isLoading}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddToCart;