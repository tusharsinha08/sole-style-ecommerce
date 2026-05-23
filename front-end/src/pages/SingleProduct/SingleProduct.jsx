import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";
import { FaStar, FaShoppingCart, FaHeart, FaSearchPlus } from "react-icons/fa";

const SingleProduct = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [showZoom, setShowZoom] = useState(false);


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

    const { image, name, price, type, shortDescription, description, Category, rating, stock, sizes, colors, reviews, additionalInfo } = product;

    return (

        <section className="max-w-7xl mx-auto px-4 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10  mb-12">
                {/* Product Image */}
                <div className="relative bg-gray-100 dark:bg-gray-900 overflow-hidden group">

                    {/* Zoom Button */}
                    <button
                        onClick={() => setShowZoom(true)}
                        className="absolute top-3 right-3 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md cursor-pointer opacity-0 group-hover:opacity-100 transition"
                    >
                        <FaSearchPlus className="text-gray-700 dark:text-gray-300" />
                    </button>

                    {/* Product Image */}
                    <img
                        src={image}
                        alt={name}
                        className="w-full h:[600px] md:h-[700px] object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                </div>

                {
                    showZoom && (
                        <div
                            onClick={() => setShowZoom(false)}
                            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                            {/* Close Button */}
                            <button
                                onClick={() => setShowZoom(false)}
                                className="absolute top-5 right-5 text-white text-3xl cursor-pointer"
                            >
                                ✕
                            </button>

                            {/* Full Size Image */}
                            <img
                                src={image}
                                alt={name}
                                className="max-w-full max-h-full object-contain rounded-lg"
                            />

                        </div>
                    )
                }

                {/* Product Info */}
                <div className="space-y-2">
                    <p className="text-gray-500 dark:text-gray-400">
                        <Link to="/">Home</Link> / <Link to={`/products?type=${type}`}>{type}</Link> / {name}
                    </p>
                    <p className="uppercase my-6 font-semibold tracking-widest text-sm text-[#2997AA]">
                        <Link to={`/products?type=${type}`}>{type}</Link>
                    </p>
                    <h1 className="text-2xl font-cormorant dark:text-gray-300">
                        {name}
                    </h1>

                    <p className="text-2xl font-bold text-gray-700 dark:text-gray-400">
                        ৳ {parseFloat(price).toFixed(2)} <span className="text-sm font-normal">& Free Shipping</span>
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {shortDescription}
                    </p>

                    {/* ratings */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-400" />
                            <FaStar className="text-yellow-400" />
                            <FaStar className="text-yellow-400" />
                            <FaStar className="text-yellow-400" />
                            <FaStar className="text-yellow-400" />
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {`(${rating})`}
                        </span>
                    </div>

                    {/* size & color */}
                    <div className="flex gap-6 items-center">
                        <div className='space-y-2'>
                            <div className="flex items-center gap-4">
                                {
                                    sizes ? (
                                        <div className="flex flex-wrap gap-2">
                                            {sizes.map(size => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`border px-3 py-1 rounded-sm text-xs cursor-pointer transition ${selectedSize === size
                                                        ? "text-black border-black dark:text-gray-300 dark:border-gray-300"
                                                        : "border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-300"
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            Size not available
                                        </p>)
                                }
                            </div>
                            <div className="flex items-center gap-4">
                                {
                                    colors ? (
                                        <div className="flex flex-wrap gap-2">
                                            {colors.map(color => (
                                                <button
                                                    key={color}
                                                    onClick={() => setSelectedColor(color)}
                                                    className={`border-2 border-gray-300 p-2 rounded-full cursor-pointer transition ${selectedColor === color
                                                        ? "border-gray-700 dark:border-gray-300"
                                                        : " dark:border-gray-700"
                                                        }`}

                                                    style={{ backgroundColor: color }}
                                                    title={color}
                                                >
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            Color not available
                                        </p>)
                                }
                            </div>
                        </div>

                        {
                            selectedSize || selectedColor ? (
                                <p className="text-sm text-gray-500">
                                    <button className="cursor-pointer mb-0" onClick={() => { setSelectedSize(null); setSelectedColor(null) }}>Clear</button>
                                </p>
                            ) : <span></span>
                        }
                    </div>

                    {/* divider */}
                    <hr className="my-4 text-gray-300 dark:text-gray-700" />

                    {
                        selectedSize && selectedColor || quantity > 1 ? (
                            <p className="text-2xl font-bold text-gray-700 dark:text-gray-400">৳ {parseFloat(price * quantity).toFixed(2)}</p>
                        ) : null
                    }

                    {/* Add to cart and wishlist buttons */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <div className="py-2 w-12 border text-center border-gray-300 dark:border-gray-700 cursor-pointer dark:bg-gray-700 dark:text-white" onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
                                -
                            </div>
                            <div className="py-2 w-12 text-center border border-gray-300 dark:border-gray-700 dark:text-gray-300">
                                {quantity}
                            </div>
                            <div className="py-2 w-12 border text-center border-gray-300 dark:border-gray-700 cursor-pointer dark:bg-gray-700 dark:text-white" onClick={() => setQuantity(quantity + 1)}>
                                +
                            </div>
                        </div>
                        <button className="btn rounded-none text-[#3AA6B9] py-4 shadow-none bg-transparent border-[#3AA6B9] hover:bg-[#3AA6B9] hover:text-white">
                            <FaShoppingCart /> Add To Cart
                        </button>
                    </div>

                    {/* divider */}
                    <hr className="my-4 text-gray-300 dark:text-gray-700" />

                    {/* Extra Info */}
                    <div className="flex gap-6">
                        <p className="dark:text-gray-300">
                            <span className="font-semibold">
                                Category:
                            </span>{" "}
                            {type}
                        </p>
                        <p className="dark:text-gray-300">
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

                    <fieldset className="max-w-2xl mx-auto border border-gray-300 dark:border-gray-700 p-6 text-center">
                        <legend className="text-gray-700 px-3 mx-auto dark:text-gray-300">
                            Guaranteed Safe Checkout
                        </legend>

                        <div className="flex flex-wrap justify-center items-center gap-4 mt-2">
                            <img src="visa.svg" alt="Visa" className="h-8 w-auto object-contain" />
                            <img src="mastercard.svg" alt="Mastercard" className="h-8 w-auto object-contain" />
                            <img src="amex.svg" alt="American Express" className="h-8 w-auto object-contain" />
                            <img src="discover.svg" alt="Discover" className="h-8 w-auto object-contain" />
                        </div>
                    </fieldset>
                </div>
            </div>

            {/* divider */}
            <hr className="mt-4 text-gray-300 dark:text-gray-700" />

            <div className="flex gap-6 ">
                <button
                    onClick={() => setActiveTab("description")}
                    className={`cursor-pointer p-2 border-t-4 font-semibold text-gray-700 dark:text-gray-300 border-t-[#3AA6B9] transition
                ${activeTab === "description"
                            ? "border-t-[#3AA6B9]"
                            : "border-t-transparent "
                        }`}
                >
                    Description
                </button>
                <button
                    onClick={() => setActiveTab("additionalInfo")}
                    className={`cursor-pointer p-2 border-t-4 font-semibold text-gray-700 dark:text-gray-300 border-t-[#3AA6B9] transition
                    ${activeTab === "additionalInfo"
                            ? "border-t-[#3AA6B9]"
                            : "border-t-transparent "
                        }`}
                >
                    Additional Info
                </button>
                <button
                    onClick={() => setActiveTab("Reviews")}
                    className={`cursor-pointer p-2 border-t-4 font-semibold text-gray-700 dark:text-gray-300 border-t-[#3AA6B9] transition
                    ${activeTab === "Reviews"
                            ? "border-t-[#3AA6B9]"
                            : "border-t-transparent "
                        }`}
                >
                    Reviews ({reviews})
                </button>
            </div>

            {activeTab === "description" && (
                <div className="mt-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                    {description}
                </div>
            )}
            {activeTab === "additionalInfo" && (
                <div className="mt-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                    {additionalInfo}
                </div>
            )}
            {activeTab === "Reviews" && (
                <div className="mt-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                    {reviews}
                </div>
            )}

        </section>
    );
};

export default SingleProduct;