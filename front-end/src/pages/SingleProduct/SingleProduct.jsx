import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";

const SingleProduct = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`)
            .then((res) => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });

    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h2 className="text-2xl font-bold">
                    Product Not Found
                </h2>
            </div>
        );
    }

    const { image, name, price, type, description, brand, rating, stock } = product;

    return (

        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Product Image */}
                <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-[500px] object-cover hover:scale-105 duration-300"
                    />
                </div>

                {/* Product Info */}
                <div className="space-y-5">
                    <p className="uppercase tracking-widest text-sm text-gray-500">
                        {type}
                    </p>
                    <h1 className="text-4xl font-bold dark:text-white">
                        {name}
                    </h1>
                    <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>
                        <span className="text-gray-500">
                            ({rating || 4.8})
                        </span>
                    </div>

                    <h2 className="text-3xl font-bold text-primary">
                        $ {price}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {description}
                    </p>

                    {/* Extra Info */}
                    <div className="space-y-2">
                        <p className="dark:text-white">
                            <span className="font-semibold">
                                Brand:
                            </span>{" "}
                            {brand || "Nike"}
                        </p>
                        <p className="dark:text-white">
                            <span className="font-semibold">
                                Availability:
                            </span>{" "}
                            {
                                stock > 0
                                    ? "In Stock"
                                    : "Out of Stock"
                            }
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button className="btn btn-primary px-8">
                            <FaShoppingCart />
                            Add To Cart
                        </button>
                        <button className="btn btn-outline">
                            <FaHeart />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;