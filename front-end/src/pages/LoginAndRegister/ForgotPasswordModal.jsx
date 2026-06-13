import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const ForgotPasswordModal = ({ isModalOpen, setIsModalOpen }) => {
    const { resetPassword } = useAuth();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const handleForgotPassword = async (data) => {
        try {
            setLoading(true);

            await resetPassword(data.email);

            Swal.fire({
                icon: "success",
                title: "Reset Link Sent",
                text: "Please check your email inbox and spam folder.",
                confirmButtonColor: "#06b6d4",
            });

            reset();
            setIsModalOpen(false);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed",
                text: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
            <div className="relative w-full max-w-md rounded-md bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 animate-in fade-in zoom-in duration-200">

                {/* Close Button */}
                <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 btn btn-circle btn-sm "
                >
                    ✕
                </button>

                {/* Content */}
                <div className="p-8">
                    <div className="flex justify-center mb-5">
                        <div className="w-16 h-16 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                            <MdOutlineMarkEmailRead className="text-3xl text-cyan-500" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                        Forgot Password?
                    </h2>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 mb-6">
                        Enter your registered email address and we'll send you a password reset link.
                    </p>

                    <form
                        onSubmit={handleSubmit(handleForgotPassword)}
                        className="space-y-5"
                    >
                        <div>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="input input-bordered w-full bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Please enter a valid email",
                                    },
                                })}
                            />

                            {errors.email && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-neutral w-full"
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                "Send Reset Link"
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="btn bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-400 w-full"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordModal;