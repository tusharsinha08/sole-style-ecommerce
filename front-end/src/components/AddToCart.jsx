import { useMemo } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { useCart } from "../hooks/useCart";

const AddToCart = ({ isOpen, setIsOpen }) => {

    const { cartItems, setCartItems } = useCart();

    // Increase quantity
    const handleIncrease = (index) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity += 1;
        setCartItems(updatedCart);
    };

    // Decrease quantity
    const handleDecrease = (index) => {
        const updatedCart = [...cartItems];

        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
        }

        setCartItems(updatedCart);
    };

    // Remove item
    const handleRemove = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);

        setCartItems(updatedCart);
    };

    // Subtotal
    const subtotal = useMemo(() => {
        return cartItems.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );
    }, [cartItems]);

    // Total quantity
    const totalQuantity = useMemo(() => {
        return cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );
    }, [cartItems]);

    return (
        <div>
            {/* Overlay */}
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
                ${isOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
            ></div>

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-[90%] md:w-[420px] bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 flex flex-col
                ${isOpen
                        ? "translate-x-0"
                        : "translate-x-full"
                    }`}
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

                    {cartItems.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-gray-500">
                            Your cart is empty
                        </div>
                    ) : (
                        cartItems.map((item, index) => (

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

                                                {/* Details */}
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    <b>Size:</b> {item.size} <b>Color:</b> {item.color}
                                                </p>
                                            </div>

                                            <button
                                                onClick={() => handleRemove(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <MdDeleteForever className="text-2xl" />
                                            </button>

                                        </div>

                                        {/* Bottom */}
                                        <div className="flex items-center justify-between mt-3">

                                            {/* Quantity */}
                                            <div className="flex items-center">

                                                <button
                                                    onClick={() => handleDecrease(index)}
                                                    className="w-8 border dark:border-gray-600 dark:text-gray-300 cursor-pointer"
                                                >
                                                    -
                                                </button>

                                                <div className="w-10 text-center border-y dark:border-gray-600 dark:text-gray-300">
                                                    {item.quantity}
                                                </div>

                                                <button
                                                    onClick={() => handleIncrease(index)}
                                                    className="w-8 border dark:border-gray-600 dark:text-gray-300 cursor-pointer"
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
                            <p className=" text-gray-600 dark:text-gray-400 pb-2">
                                Got a discount code?
                            </p>
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

                    <button className="w-full py-3 bg-black text-white rounded-lg hover:opacity-90 transition">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddToCart;