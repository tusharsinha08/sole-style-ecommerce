import contactBanner from "../../assets/images/contact.png";

import { useForm } from "react-hook-form";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Contact = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm();
    const axiosSecure = useAxiosSecure()

    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.post("/contacts", data);

            if (res.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Message Sent",
                    text: "We'll get back to you shortly.",
                });

                reset();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed",
                text: "Something went wrong",
            });
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
            {/* Header */}
            <div
                className="hero bg-fixed min-h-[70vh]"
                style={{
                    backgroundImage: `url(${contactBanner})`,
                }}
            >
                <div className="hero-overlay bg-black/60"></div>

                <div className="text-neutral-content text-center">
                    <div className="max-w-3xl px-4">
                        <h1 className="mb-3 text-4xl md:text-6xl font-cormorant italic font-bold">
                            Contact Us
                        </h1>
                        <p className="mb-3 text-sm md:text-base">
                            Home {'>>'} Contact Us
                        </p>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="card bg-gray-100 dark:bg-gray-800 shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title dark:text-white">
                                    Get In Touch
                                </h2>

                                <div className="space-y-5 mt-4">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-full bg-gray-900 dark:bg-gray-100 text-gray-300 dark:text-gray-900">
                                            <FaPhoneAlt />
                                        </div>
                                        <div>
                                            <p className="font-semibold">
                                                Phone
                                            </p>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                +880 1234 567890
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-full bg-gray-900 dark:bg-gray-100 text-gray-300 dark:text-gray-900">
                                            <FaEnvelope />
                                        </div>
                                        <div>
                                            <p className="font-semibold">
                                                Email
                                            </p>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                support@solestyle.com
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-full bg-gray-900 dark:bg-gray-100 text-gray-300 dark:text-gray-900">
                                            <FaMapMarkerAlt />
                                        </div>
                                        <div>
                                            <p className="font-semibold">
                                                Address
                                            </p>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                Dhaka, Bangladesh
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Extra Card */}
                        <div className="card bg-gray-800 text-gray-400 dark:bg-gray-100 dark:text-gray-900 shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title">
                                    Customer Support
                                </h2>
                                <p>
                                    Our support team is available 24/7 to assist
                                    you with orders, returns, and product inquiries.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="card bg-gray-100 dark:bg-gray-800 shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title mb-4 dark:text-white">
                                    Send a Message
                                </h2>

                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="space-y-5"
                                >
                                    {/* Name */}
                                    <div>
                                        <label className="label">
                                            <span className="label-text dark:text-gray-300">
                                                Full Name
                                            </span>
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Enter your name"
                                            className="input input-bordered w-full dark:bg-gray-700 bg-gray-300 dark:text-white"
                                            {...register("name", {
                                                required: "Name is required",
                                            })}
                                        />

                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="label">
                                            <span className="label-text dark:text-gray-300">
                                               Your Email Address
                                            </span>
                                        </label>

                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="input input-bordered w-full dark:bg-gray-700 bg-gray-300 dark:text-white"
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value:
                                                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message:
                                                        "Please enter a valid email",
                                                },
                                            })}
                                        />

                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label className="label">
                                            <span className="label-text dark:text-gray-300">
                                                Subject
                                            </span>
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Subject"
                                            className="input input-bordered w-full dark:bg-gray-700 bg-gray-300 dark:text-white"
                                            {...register("subject", {
                                                required: "Subject is required",
                                            })}
                                        />

                                        {errors.subject && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.subject.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="label">
                                            <span className="label-text dark:text-gray-300">
                                                Message
                                            </span>
                                        </label>

                                        <textarea
                                            rows="6"
                                            placeholder="Write your message..."
                                            className="textarea textarea-bordered w-full dark:bg-gray-700 bg-gray-300 dark:text-white"
                                            {...register("message", {
                                                required:
                                                    "Message cannot be empty",
                                                minLength: {
                                                    value: 10,
                                                    message:
                                                        "Message must be at least 10 characters",
                                                },
                                            })}
                                        />

                                        {errors.message && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.message.message}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-gray-950 py-3 rounded text-gray-300 hover:bg-gray-900 cursor-pointer w-full"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm"></span>
                                                Sending...
                                            </>
                                        ) : (
                                            "Send Message"
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;