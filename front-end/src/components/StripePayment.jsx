import {
    CardElement,
    useElements,
    useStripe
} from "@stripe/react-stripe-js";

import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const StripePayment = ({ totalAmount, onSuccess }) => {

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [cardComplete, setCardComplete] = useState(false);

    const [processing, setProcessing] = useState(true);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        if (totalAmount > 0) {
            axiosSecure.post("/payments/create-payment-intent", {
                amount: totalAmount
            })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                    setProcessing(false);
                });
        }

    }, [totalAmount]);

    const handlePayment = async () => {

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);

        const { error } = await stripe.createPaymentMethod({
            type: "card",
            card
        });

        if (error) {
            return;
        }


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
            <CardElement
                onChange={(event) => {
                    setCardComplete(event.complete);
                }}
            />

            <button
                disabled={!cardComplete || !stripe || !clientSecret}
                type="button"
                onClick={handlePayment}
                className="btn bg-gray-900 text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
               {processing ? "Processing..." : `Pay ৳ ${totalAmount}`}
            </button>
        </div>
    );
};

export default StripePayment;