import { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";


const AddToCart = ({ isOpen, setIsOpen, data }) => {
    const [openDetails, setOpenDetails] = useState(false);
    const [quantity, setQuantity] = useState(data?.quantity || 1);
    const [totalQuantity, setTotalQuantity] = useState(1);

    return (
        <div
            className={`fixed top-0 right-0 h-full w-4/5 md:w-[400px] bg-gray-200 dark:bg-gray-700 shadow-xl z-50 transform transition-transform duration-300
            ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >

            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 -z-10"
                />
            )}

            <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
                {/* Close button */}
                <button
                    onClick={() => setIsOpen(false)}
                >
                    <IoIosArrowRoundForward className="text-4xl font-bold"></IoIosArrowRoundForward>
                </button>
                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">Review Your Cart</h3>

                <p className="text-lg px-2 bg-gray-300 dark:bg-gray-600">{totalQuantity}</p>
            </div>

            <div className="p-4 space-y-3 text-gray-700 dark:text-gray-400 border-b border-gray-400 dark:border-gray-600">
                <div className="flex justify-between">
                    <div className="flex space-x-4">
                        <img className="w-20 h-20 rounded-lg" src={data?.image} alt="Product" />
                        <div>
                            <h2 className=" font-bold">{data?.name}</h2>
                            <button
                                onClick={() => setOpenDetails(!openDetails)}
                                className="text-gray-500 text-sm font-semibold hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">
                                View Details
                            </button>
                            {
                                openDetails && (
                                    <div className="my-2 p-2 bg-gray-300 dark:bg-gray-600 rounded">
                                        <p><b>Size:</b> {data?.size}</p>
                                        <p><b>Color:</b> {data?.color}</p>
                                        <p><b>Quantity:</b> {quantity}</p>
                                        <p><b>Price per item:</b> ৳ {data?.price}</p>
                                    </div>
                                )
                            }
                            <p className="text-gray-500 font-semibold">৳ {data?.price * quantity}</p>

                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="text-red-500 text-sm hover:text-red-700 dark:hover:text-red-300 cursor-pointer"
                            onClick={() => {
                                // Handle remove item logic
                            }}>
                            <MdDeleteForever className="text-2xl" />
                        </button>
                        <div className="flex flex-col items-center">
                            <div className="px-2 w-8 text-xl border text-center border-gray-300 dark:border-gray-700 cursor-pointer dark:bg-gray-700 dark:text-white" onClick={() => {
                                setQuantity(quantity + 1)
                                setTotalQuantity(totalQuantity + 1)
                            }}>
                                +
                            </div>
                            <div className="px-2 w-8 text-center border border-gray-300 dark:border-gray-700 dark:text-gray-300">
                                {quantity}
                            </div>
                            <div className="px-2 w-8 text-xl border text-center border-gray-300 dark:border-gray-700 cursor-pointer dark:bg-gray-700 dark:text-white" onClick={() => {
                                if (quantity > 1) {
                                    setQuantity(prev => prev - 1);

                                    setTotalQuantity(prev =>
                                        prev > 1 ? prev - 1 : 1
                                    );
                                }
                            }}>
                                -
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default AddToCart;