import { Link, useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateOrder = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting }
    } = useForm();

    const {
        data: order,
        isPending
    } = useQuery({
        queryKey: ["order", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/${id}`);

            const data = res.data;

            reset({
                name: data.customer?.name,
                email: data.customer?.email,
                phone: data.customer?.phone,

                address: data.shippingAddress?.address,
                district: data.shippingAddress?.district,
                city: data.shippingAddress?.city,
                postalCode: data.shippingAddress?.postalCode,

                paymentStatus: data.paymentStatus,
                orderStatus: data.orderStatus,
            });

            return data;
        }
    });

    const onSubmit = async (data) => {

        const updateDoc = {
            customer: {
                name: data.name,
                email: data.email,
                phone: data.phone
            },

            shippingAddress: {
                address: data.address,
                district: data.district,
                city: data.city,
                postalCode: data.postalCode,
                phone: data.phone
            },

            paymentStatus: data.paymentStatus,
            orderStatus: data.orderStatus
        };

        try {

            const res = await axiosSecure.patch(
                `/orders/update/${id}`,
                updateDoc
            );

            if (
                res.data.modifiedCount > 0 ||
                res.data.matchedCount > 0
            ) {
                Swal.fire({
                    icon: "success",
                    title: "Order Updated Successfully",
                    timer: 1500,
                    showConfirmButton: false
                });


                const notification = {
                    userEmail: data.email,
                    type: 'order',
                    title: `Order placed`,
                    message: `Your order has been ${data.orderStatus}`,
                    orderId: res.data.insertedId,
                    read: false,
                    createdAt: new Date()
                }
                axiosSecure.post('/notifications', notification)

                navigate('/admin/orders')
            }

        } catch (error) {

            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Update Failed"
            });
        }
    };

    if (isPending) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300">

            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm p-6">

                <h2 className="text-3xl font-bold mb-8">
                    Update Order
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-8"
                >

                    {/* CUSTOMER */}

                    <div>
                        <h3 className="text-xl font-semibold mb-4">
                            Customer Information
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4">

                            <input
                                {...register("name")}
                                className="input input-bordered bg-gray-200 dark:bg-gray-700 w-full w-full"
                                placeholder="Customer Name"
                            />

                            <input
                                {...register("email")}
                                readOnly
                                className="input input-bordered bg-gray-200 dark:bg-gray-700 w-full w-full"
                            />

                            <input
                                {...register("phone")}
                                className="input input-bordered bg-gray-200 dark:bg-gray-700 w-full w-full"
                                placeholder="Phone"
                            />

                        </div>
                    </div>

                    {/* SHIPPING */}

                    <div>
                        <h3 className="text-xl font-semibold mb-4">
                            Shipping Address
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4">

                            <input
                                {...register("address")}
                                className="input input-bordered bg-gray-200 dark:bg-gray-700 w-full"
                                placeholder="Address"
                            />

                            <input
                                {...register("district")}
                                className="input input-bordered bg-gray-200 dark:bg-gray-700 w-full"
                                placeholder="District"
                            />

                            <input
                                {...register("city")}
                                className="input input-bordered bg-gray-200 dark:bg-gray-700 w-full"
                                placeholder="City"
                            />

                            <input
                                {...register("postalCode")}
                                className="input input-bordered bg-gray-200 dark:bg-gray-700 w-full"
                                placeholder="Postal Code"
                            />

                        </div>
                    </div>

                    {/* PAYMENT */}

                    <div>
                        <h3 className="text-xl font-semibold mb-4">
                            Payment Information
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4">

                            <input
                                value={order?.paymentMethod}
                                readOnly
                                className="input input-bordered bg-gray-200 dark:bg-gray-700 w-full"
                            />
                            {order?.transactionId &&
                                <input
                                    value={order?.transactionId}
                                    readOnly
                                    className="input input-bordered bg-gray-200 dark:bg-gray-700 w-full"
                                />
                            }

                            <select
                                {...register("paymentStatus")}
                                className="select select-bordered bg-gray-200 dark:bg-gray-700"
                            >
                                <option value="pending">
                                    Pending
                                </option>

                                <option value="paid">
                                    Paid
                                </option>

                                <option value="failed">
                                    Failed
                                </option>

                                <option value="refunded">
                                    Refunded
                                </option>
                            </select>

                        </div>
                    </div>

                    {/* ORDER STATUS */}

                    <div>
                        <h3 className="text-xl font-semibold mb-4">
                            Order Status
                        </h3>

                        <select
                            {...register("orderStatus")}
                            className="select select-bordered bg-gray-200 dark:bg-gray-700 w-full"
                        >
                            <option value="pending">
                                Pending
                            </option>

                            <option value="confirmed">
                                Confirmed
                            </option>

                            <option value="processing">
                                Processing
                            </option>

                            <option value="shipped">
                                Shipped
                            </option>

                            <option value="delivered">
                                Delivered
                            </option>

                            <option value="cancelled">
                                Cancelled
                            </option>
                        </select>
                    </div>

                    {/* PRODUCTS */}

                    <div>
                        <h3 className="text-xl font-semibold mb-4">
                            Ordered Products
                        </h3>

                        <div className="overflow-x-auto">
                            <table className="table">

                                <thead className="text-gray-900 dark:text-gray-300">
                                    <tr>
                                        <th>Name</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {order?.products?.map(
                                        (product, index) => (
                                            <tr key={index}>

                                                <td>
                                                    <Link to={`/products/${product.productId}`}>{product.name}</Link>
                                                </td>

                                                <td>
                                                    {product.color}
                                                </td>

                                                <td>
                                                    {product.size}
                                                </td>

                                                <td>
                                                    {product.quantity}
                                                </td>

                                                <td>
                                                    ৳ {product.price}
                                                </td>

                                            </tr>
                                        )
                                    )}

                                </tbody>

                            </table>
                        </div>
                    </div>

                    {/* TOTAL */}

                    <div className="flex justify-end">

                        <div className="text-xl font-bold">
                            Total: ৳ {order?.totalPrice}
                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-neutral"
                    >
                        {
                            isSubmitting
                                ? "Updating..."
                                : "Update Order"
                        }
                    </button>

                </form>

            </div>

        </div>
    );
};

export default UpdateOrder;