import {
    CardElement,
    useElements,
    useStripe
} from "@stripe/react-stripe-js";

import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const StripePayment = ({ totalAmount, orderData, onSuccess }) => {

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [error, setError] = useState('')
    const { user } = useAuth();

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        if (totalAmount > 0) {
            axiosSecure.post("/payments/create-payment-intent", {
                amount: totalAmount
            })
                .then(res => {
                    console.log(res.data.clientSecret);

                    setClientSecret(res.data.clientSecret);
                });
        }

    }, []);

    const handlePayment = async () => {

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        });

        if (error) {
            setError(error.message);
            return;
        } else {
            setError('')
        }
        console.log(orderData);


        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'anonymous'
                }
            }
        });

        if (confirmError) {
            setError(confirmError.message)
            console.log("Stripe Error:", confirmError);
            return;

        } else {
            console.log(paymentIntent.id);

            onSuccess(
                paymentIntent.id
            );
        }

    };

    return (
        <div>
            <CardElement />

            <button
                type="button"
                onClick={handlePayment}
                className="btn btn-primary mt-4"
            >
                Pay ৳ {totalAmount}
            </button>
        </div>
    );
};

export default StripePayment;