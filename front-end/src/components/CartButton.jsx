import { FaShoppingCart } from "react-icons/fa";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

const CartButton = ({ setIsOpen }) => {

    const guestCart = JSON.parse(localStorage.getItem("carts")) || [];
    const { carts } = useCart();
    const { user } = useAuth();

    return (
        <button
            onClick={() => setIsOpen(true)}
            className="
                fixed bottom-6 right-6 z-30 bg-black dark:bg-white text-white dark:text-black p-4 rounded-full shadow-lg hover:scale-105 transition cursor-pointer"
        >
            <div className="relative">
                <FaShoppingCart size={22} />

                {/* Badge */}
                <span
                    className="absolute bottom-5 right-5 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                >
                    {user ?

                        carts.length : guestCart.length 
                    }
                </span>
            </div>
        </button>
    );
};

export default CartButton;