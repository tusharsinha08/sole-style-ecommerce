import React from "react";
import { useForm } from "react-hook-form";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../../hooks/useScrollToTop";
import StripePayment from "../../components/StripePayment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);


const Checkout = () => {
    const { carts, subtotal, refetch } = useCart();
    const { user } = useAuth();
    const [shippingFee, setShippingFee] = useState(0)
    const axiosSecure = useAxiosSecure();
    const [showCardForm, setShowCardForm] = useState(false);
    const navigate = useNavigate()
    const scrollToTop = useScrollToTop()
    const [pendingOrder, setPendingOrder] = useState(null);
    console.log(carts);


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            email: user?.email,
            // later from DB
            address: user?.address || "",
            city: user?.city || "",
            district: user?.district || "",
            postalCode: user?.postalCode || "",
        }
    });

    const handleCashOnDelivery = (orderItem) => {
        axiosSecure.post('/orders', orderItem)
            .then(res => {
                if (res.data.insertedId) {
                    console.log(res.data);

                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        icon: "success",
                        title: "Your order is placed successfully",
                        showConfirmButton: false,
                        timer: 500,
                        customClass: {
                            popup: 'w-56 p-2 text-sm'
                        }
                    });

                    const cartIds = carts.map(item => item._id)
                    console.log({ data: { cartIds } });

                    axiosSecure.delete('/carts/delete-many', { data: cartIds })
                        .then(res => console.log(res.data)
                        )
                    reset()
                    refetch()
                    scrollToTop()
                    navigate('/my-account/orders')
                }
            })
    }

    const handleStripeSuccess = async (transactionId) => {

        const payment = {
            email: user?.email,
            amount: subtotal + shippingFee,
            transactionId: transactionId,
            status: "paid",
            date: new Date()
        };

        const orderItem = {
            ...pendingOrder,
            paymentStatus: 'paid',
            transactionId: transactionId,
            orderStatus: 'pending',
            orderTime: new Date()
        }

        const cartIds = carts.map(item => item._id)

        const res = await axiosSecure.post("/payments", payment);

        if (res.data.insertedId) {
            await axiosSecure.post('/orders', orderItem)
            await axiosSecure.delete("/carts/delete-many", { data: cartIds });

            refetch();

            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                showConfirmButton: false,
                text: "Payment Successful",
                timer: 1500
            });

            navigate("/my-account/orders");
        }
    }



    const onSubmit = async (data) => {
        console.log(data);

        const { name, email, phone, address, city, district, postalCode, paymentMethod } = data
        const orderItem = {
            customer: {
                name: name,
                email: email,
                phone: phone
            },
            shippingAddress: {
                address: address,
                district: district,
                city: city,
                phone: phone,
                postalCode: postalCode,
            },
            paymentMethod: paymentMethod,
            products: carts.map(item => ({
                productId: item.productId,
                name: item.name,
                color: item.color,
                size: item.size,
                quantity: item.quantity,
                price: item.totalPrice
            })),
            totalPrice: subtotal + shippingFee,
            paymentStatus: 'pending',
            orderStatus: 'pending',
            createdAt: new Date(),
            updatedAt: new Date()
        }
        console.log(" order item", orderItem);


        if (paymentMethod === 'bKash') {
            // setShippingCost(120)
        } else if (paymentMethod === 'Card') {
            setShowCardForm(true);
            setPendingOrder(orderItem)
        } else {
            handleCashOnDelivery(orderItem)
        }

        // Send order data to backend
        // axiosSecure.post("/orders", data)
    };

    return (
        <div className="max-w-7xl mx-auto px-4 pt-20 pb-12 text-gray-700 dark:text-gray-300">
            <h1 className="text-3xl font-bold mb-8">
                Checkout
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Form Section */}
                <div className="md:col-span-2 dark:bg-gray-800 p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-6">
                        Billing Information
                    </h2>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        {/* Name */}
                        <div>
                            <input
                                type="text"
                                placeholder="Your Name"
                                defaultValue={user?.displayName}
                                {...register("name", {
                                    required:
                                        "Name is required",
                                })}
                                className="w-full border rounded-lg px-4 py-3"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                readOnly
                                placeholder="Email Address"
                                defaultValue={user?.email}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value:
                                            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message:
                                            "Enter a valid email",
                                    },
                                })}
                                className="w-full bg-gray-300 dark:bg-gray-600 border rounded-lg px-4 py-3"
                            />

                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                defaultValue={user?.phone}
                                {...register("phone", {
                                    required:
                                        "Phone number is required",
                                    minLength: {
                                        value: 11,
                                        message:
                                            "Minimum 11 digits required",
                                    },
                                })}
                                className="w-full border rounded-lg px-4 py-3"
                            />

                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        {/* Address */}
                        <div>
                            <input
                                type="text"
                                placeholder="Street Address"
                                {...register("address", {
                                    required:
                                        "Address is required",
                                })}
                                className="w-full border rounded-lg px-4 py-3"
                            />

                            {errors.address && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.address.message}
                                </p>
                            )}
                        </div>

                        {/* Location */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="City"
                                    {...register("city", {
                                        required:
                                            "City is required",
                                    })}
                                    className="w-full border rounded-lg px-4 py-3"
                                />

                                {errors.city && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.city.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="District"
                                    {...register("district", {
                                        required:
                                            "District is required",
                                    })}
                                    className="w-full border rounded-lg px-4 py-3"
                                />

                                {errors.district && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.district.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Postal Code"
                                    {...register("postalCode", {
                                        required:
                                            "Postal code is required",
                                    })}
                                    className="w-full border rounded-lg px-4 py-3"
                                />

                                {errors.postalCode && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.postalCode.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div>
                            <h3 className="font-semibold mb-3">
                                Payment Method
                            </h3>

                            <div className="space-y-3">
                                <label className="flex items-center gap-3 border p-3 rounded-lg">
                                    <input
                                        type="radio"
                                        value="COD"
                                        {...register("paymentMethod", {
                                            required:
                                                "Select a payment method",
                                        })}
                                        onClick={() => {
                                            setShippingFee(120);
                                            setShowCardForm(false);
                                        }}
                                    />
                                    Cash on Delivery
                                </label>

                                <label className="flex items-center gap-3 border p-3 rounded-lg">
                                    <input
                                        type="radio"
                                        value="bKash"
                                        {...register("paymentMethod")}
                                        onClick={() => {
                                            setShippingFee(0);
                                            setShowCardForm(false);
                                        }}
                                    />
                                    bKash
                                </label>

                                <label className="flex items-center gap-3 border p-3 rounded-lg">
                                    <input
                                        type="radio"
                                        value="Card"
                                        {...register("paymentMethod")}
                                        onClick={() => {
                                            setShippingFee(0);
                                        }}
                                    />
                                    Credit / Debit Card
                                </label>
                            </div>

                            {errors.paymentMethod && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.paymentMethod.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gray-900 text-white py-3 cursor-pointer rounded-lg hover:text-gray-300"
                        >
                            Place Order
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="md:col-span-2 p-6 rounded-xl shadow h-fit dark:bg-gray-800">
                    <h2 className="text-xl font-semibold mb-6 ">
                        Order Summary
                    </h2>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>৳ {subtotal}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Shipping</span>
                            {shippingFee ?
                                <span>৳ {shippingFee}</span>
                                : <span>Free</span>
                            }
                        </div>

                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>৳ {subtotal + shippingFee}</span>
                        </div>
                        {

                            showCardForm && (

                                <div>
                                    {/* divider */}
                                    <hr className="my-4 text-gray-300 dark:text-gray-700" />

                                    <h4 className="text-lg font-semibold mb-4">Enter your card details</h4>
                                    <Elements stripe={stripePromise}>
                                        <StripePayment
                                            totalAmount={subtotal + shippingFee}
                                            onSuccess={handleStripeSuccess}
                                        />
                                    </Elements>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;