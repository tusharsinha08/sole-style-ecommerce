import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import ForgotPasswordModal from "./ForgotPasswordModal";

const Login = () => {
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/my-account/dashboard';
    const { refetch } = useCart();
    const axiosSecure = useAxiosSecure()
    const guestCart = JSON.parse(localStorage.getItem("carts")) || [];
    const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
    const [loginError, setLoginError] = useState("");


    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const handleLogin = async (data) => {
        const { email, password } = data;

        try {
            await signInUser(email, password);

            // Add guest cart items to database
            for (const cart of guestCart) {
                const updatedCartItem = {
                    ...cart,
                    email
                };

                const res = await axiosSecure.post('/carts', updatedCartItem);

                if (res.data.insertedId) {
                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        icon: "success",
                        title: `${cart.name} is added to cart.`,
                        showConfirmButton: false,
                        timer: 1000,
                        customClass: {
                            popup: 'w-56 p-2 text-sm'
                        }
                    });
                }
            }

            refetch();
            localStorage.removeItem("carts");
            reset();
            navigate(from, { replace: true });

        } catch (error) {
            let message = "Login failed. Please try again.";

            if (error.code === "auth/user-not-found") {
                message = "No account found with this email.";
            } else if (
                error.code === "auth/wrong-password" ||
                error.code === "auth/invalid-credential"
            ) {
                message = "Incorrect email or password.";
            } else if (error.code === "auth/too-many-requests") {
                message = "Too many attempts. Please try again later.";
            }
            setLoginError(message);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center px-4 pt-10">
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-8 md:p-10">

                {/* Heading */}
                <div className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
                        Sign In
                    </h1>

                    <p className="mt-3 text-gray-500 dark:text-gray-400">
                        Welcome back! Please login to your account.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(handleLogin)}
                    className="space-y-6"
                >

                    {/* Email */}
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400">
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input w-full mt-2 border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                            {...register("email", { required: true })}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="input w-full mt-2 border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                            {...register("password", { required: true })}
                        />
                    </div>

                    {/* Forgot */}
                    <div className="flex justify-end">
                        <button
                            onClick={() => setIsForgotModalOpen(true)}
                            className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition cursor-pointer"
                        >
                            Forgot password?
                        </button>
                    </div>

                    {loginError && (
                        <p className="text-red-500 text-sm mt-2">
                            {loginError}
                        </p>
                    )}

                    {/* Button */}
                    <button
                        type="submit"
                        className="btn w-full border-0 bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 text-lg"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-500 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link to={'/register'} className="text-black dark:text-white font-bold hover:underline">
                        Register
                    </Link>
                </p>
            </div>

            <ForgotPasswordModal
                isModalOpen={isForgotModalOpen}
                setIsModalOpen={setIsForgotModalOpen}
            ></ForgotPasswordModal>
        </div>

    );
};

export default Login;