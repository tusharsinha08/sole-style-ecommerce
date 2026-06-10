import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { FaStar, FaShoppingCart, FaHeart, FaSearchPlus } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ProductCard from "../../components/ProductCard";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import AddToCart from "../../components/AddToCart";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";
import { useForm } from "react-hook-form";


const SingleProduct = () => {

    const axios = useAxiosPublic();
    const axiosSecure = useAxiosSecure()

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [showZoom, setShowZoom] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [activeImage, setActiveImage] = useState("");
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { user } = useAuth();
    const { refetch } = useCart();
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        axios.get(`/products/${id}`)
            .then((res) => {
                setProduct(res.data);
                setActiveImage(res.data.images[0]);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });


        axios.get(`/reviews/${id}`)
            .then(res => {

                setReviews(res.data.data)
            })


    }, [id, reviews]);

    useEffect(() => {
        if (!product?.type) return;
        const fetchRelatedProducts = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/products?type=${product.type}`);
                const products = res.data.products.filter(p => p._id !== product._id);
                setRelatedProducts(products);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRelatedProducts();
    }, [product?.type]);

    const handleAddToCart = (cart) => {
        if (!selectedSize || !selectedColor) {
            // alert("Please select size and color");
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "warning",
                text: 'Please select size and color',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: 'w-56 p-2 text-sm'
                }
            });
            return;
        }

        const cartItem = {
            productId: cart._id,
            name: cart.name,
            image: cart.images[0],
            size: selectedSize,
            color: selectedColor,
            quantity: quantity,
            price: cart.price,
            totalPrice: cart.price * quantity
        };


        if (user && user.email) {
            const updatedCartItem = {
                ...cartItem,
                email: user?.email || null
            };
            axiosSecure.post('/carts', updatedCartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            toast: true,
                            position: "top-end",
                            icon: "success",
                            title: `${cart.name} is added to cart.`,
                            showConfirmButton: false,
                            timer: 500,
                            customClass: {
                                popup: 'w-56 p-2 text-sm'
                            }
                        });
                        localStorage.removeItem('carts');
                        refetch()
                    }
                })
                .catch(error => {
                    console.error('Error adding to cart:', error);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Failed to add item to cart!"
                    });
                });
        }

        const existingCart = JSON.parse(localStorage.getItem("carts")) || [];
        existingCart.push(cartItem);
        localStorage.setItem("carts", JSON.stringify(existingCart));

        setIsCartOpen(true);
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const newReview = {
            userName: data.user,
            email: user?.email,
            productId: id,
            comment: data.comment,
            rating: Number(data.rating),
        };


        const res = await axiosSecure.post(`/reviews`, newReview)


        if (res.data.insertedId) {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: `Your review is added`,
                showConfirmButton: false,
                timer: 500,
                customClass: {
                    popup: 'w-56 p-2 text-sm'
                }
            });
        }

        reset();
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <progress className="progress w-56"></progress>
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

    const { images, name, price, shortDescription, description, categories, rating, stock, sizes, colors } = product;

    return (

        <section className="max-w-7xl mx-auto px-4 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10  mb-12">
                {/* Product Image */}
                <div>
                    <div className="relative w-full h-[400px] md:h-[500px] bg-gray-100 dark:bg-gray-900 overflow-hidden group">

                        {/* Zoom Button */}
                        <button
                            onClick={() => setShowZoom(true)}
                            className="absolute top-3 right-3 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"
                        >
                            <FaSearchPlus className="text-gray-700 dark:text-gray-300" />
                        </button>

                        {/* Main Image */}
                        <img
                            src={activeImage}
                            alt={name}
                            className="w-full h-[400px] md:h-[500px] object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>

                    {/* THUMBNAILS */}
                    <div className="flex gap-3 mt-4 overflow">

                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={name}
                                onClick={() => setActiveImage(img)}
                                className={`w-20 h-20 object-cover cursor-pointer border-2 rounded-md transition
                            ${activeImage === img
                                        ? "border-black dark:border-white scale-105"
                                        : "border-gray-300 dark:border-gray-600 opacity-70 hover:opacity-100"
                                    }`}
                            />
                        ))}

                    </div>
                </div>


                {showZoom && (
                    <div
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                        onClick={() => setShowZoom(false)}   // 👈 click outside closes
                    >

                        {/* Close Button */}
                        <button
                            onClick={() => setShowZoom(false)}
                            className="absolute top-5 right-5 text-white text-3xl cursor-pointer"
                        >
                            ✕
                        </button>

                        {(() => {
                            const currentIndex = images.findIndex(img => img === activeImage);

                            const prevImage = images[currentIndex - 1];
                            const nextImage = images[currentIndex + 1];

                            return (
                                // 👇 STOP click from bubbling to background
                                <div
                                    className="flex items-center gap-6"
                                    onClick={(e) => e.stopPropagation()}
                                >

                                    {/* Prev Button */}
                                    <button
                                        disabled={currentIndex === 0}
                                        onClick={() => prevImage && setActiveImage(prevImage)}
                                        className={`text-white text-4xl cursor-pointer ${currentIndex === 0 ? "opacity-30 cursor-not-allowed" : ""
                                            }`}
                                    >
                                        <MdOutlineArrowBackIos />
                                    </button>

                                    {/* Image */}
                                    <img
                                        src={activeImage}
                                        alt={name}
                                        className="max-w-[90vw] max-h-[85vh] object-contain rounded-md"
                                    />

                                    {/* Next Button */}
                                    <button
                                        disabled={currentIndex === images.length - 1}
                                        onClick={() => nextImage && setActiveImage(nextImage)}
                                        className={`text-white text-4xl cursor-pointer ${currentIndex === images.length - 1
                                            ? "opacity-30 cursor-not-allowed"
                                            : ""
                                            }`}
                                    >
                                        <MdOutlineArrowForwardIos />
                                    </button>

                                </div>
                            );
                        })()}

                    </div>
                )}

                {/* Product Info */}
                <div className="space-y-2">
                    <p className="text-gray-500 dark:text-gray-400">
                        <Link to="/">Home</Link> / <Link to={`/products?category=${categories[0]}`}>{categories[0]}</Link> / {name}
                    </p>
                    <p className="uppercase my-6 font-semibold tracking-widest text-sm text-[#2997AA]">
                        <Link to={`/products?category=${categories[0]}`}>{categories[0]}</Link>
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
                        <button
                            onClick={() => handleAddToCart(product)}
                            className="btn rounded-none text-[#3AA6B9] py-4 shadow-none bg-transparent border-[#3AA6B9] hover:bg-[#3AA6B9] hover:text-white">
                            <FaShoppingCart /> Add To Cart
                        </button>
                    </div>

                    {/* divider */}
                    <hr className="my-4 text-gray-300 dark:text-gray-700" />

                    {/* Extra Info */}
                    <div className="flex gap-6">
                        <div className="dark:text-gray-300">
                            <span className="font-semibold">
                                Categories:
                            </span>{" "}
                            {
                                categories.map((category, index) => (
                                    <Link key={`${category._id}-${index}`} to={`/products?category=${category}`}>
                                        <span className="text-gray-500 text-sm"> {category}, </span>
                                    </Link>
                                ))
                            }
                        </div>
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
                {
                    colors || sizes ? (
                        <button
                            onClick={() => setActiveTab("additionalInfo")}
                            className={`cursor-pointer p-2 border-t-4 font-semibold text-gray-700 dark:text-gray-300 border-t-[#3AA6B9] transition
                    ${activeTab === "additionalInfo"
                                    ? "border-t-[#3AA6B9]"
                                    : "border-t-transparent "
                                }`}
                        >
                            Additional Info
                        </button>) : null
                }
                <button
                    onClick={() => setActiveTab("Reviews")}
                    className={`cursor-pointer p-2 border-t-4 font-semibold text-gray-700 dark:text-gray-300 border-t-[#3AA6B9] transition
                    ${activeTab === "Reviews"
                            ? "border-t-[#3AA6B9]"
                            : "border-t-transparent "
                        }`}
                >
                    Reviews ({reviews.length})
                </button>
            </div>

            <div className="mb-12">
                {activeTab === "description" && (
                    <div className="mt-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                        {description}
                    </div>
                )}
                {activeTab === "additionalInfo" && (
                    <div className="mt-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                        <table className="w-full border border-gray-300 dark:border-gray-700 border-collapse">
                            <tbody>
                                {colors && (
                                    <tr className="border-b border-gray-300 dark:border-gray-700">
                                        <td className="font-semibold w-1/6 pr-6 px-4 py-1 border border-gray-300 dark:border-gray-700">
                                            Color:
                                        </td>
                                        <td className="px-4 py-1 border border-gray-300 dark:border-gray-700">
                                            {colors.join(", ")}
                                        </td>
                                    </tr>
                                )}

                                {sizes && (
                                    <tr className="border-b border-gray-300 dark:border-gray-700">
                                        <td className="font-semibold w-1/6 pr-6 px-4 py-1 border border-gray-300 dark:border-gray-700">
                                            Size:
                                        </td>
                                        <td className="px-4 py-1 border border-gray-300 dark:border-gray-700">
                                            {sizes.join(", ")}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === "Reviews" && (
                    <div className="mt-6">

                        {/* REVIEW FORM (ONLY IF DELIVERED) */}

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="mb-6 p-4 border rounded-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-500 text-gray-900 dark:text-gray-400"
                        >
                            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                                Write a Review
                            </h3>

                            <input
                                {...register("user", { required: true })}
                                placeholder="Your name"
                                className="w-full p-2 mb-2 border rounded"
                            />
                            {errors.user && <p className="text-red-500">Name is required</p>}

                            <textarea
                                {...register("comment", { required: true })}
                                placeholder="Write your review..."
                                className="w-full p-2 mb-2 border rounded"
                            />
                            {errors.comment && (
                                <p className="text-red-500">Comment is required</p>
                            )}

                            <select
                                {...register("rating", { required: true })}
                                className="w-full p-2 mb-3 border rounded dark:bg-gray-800"
                            >
                                <option value="">Select Rating</option>
                                <option value="1">1 ⭐</option>
                                <option value="2">2 ⭐⭐</option>
                                <option value="3">3 ⭐⭐⭐</option>
                                <option value="4">4 ⭐⭐⭐⭐</option>
                                <option value="5">5 ⭐⭐⭐⭐⭐</option>
                            </select>
                            {errors.rating && (
                                <p className="text-red-500">Rating is required</p>
                            )}

                            <button
                                type="submit"
                                className="btn btn-neutral"
                            >
                                Submit Review
                            </button>
                        </form>

                        {/* REVIEW LIST (ALWAYS SHOWN) */}
                        {/* REVIEW LIST */}
                        <div className="mt-8">
                            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                                Customer Reviews ({reviews.length})
                            </h3>

                            {reviews.length === 0 ? (
                                <div className="text-center py-10 border rounded-xl bg-gray-50 dark:bg-gray-800">
                                    <p className="text-gray-500 dark:text-gray-400">
                                        No reviews yet. Be the first to review this product.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {reviews.map((review) => (
                                        <div
                                            key={review._id}
                                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            {/* Header */}
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    {/* Avatar */}
                                                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                                                        {review.userName?.charAt(0)?.toUpperCase()}
                                                    </div>

                                                    <div>
                                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                                            {review.userName}
                                                        </h4>

                                                        {review.createdAt && (
                                                            <p className="text-xs text-gray-500">
                                                                {new Date(review.createdAt).toLocaleDateString()}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Rating */}
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span
                                                            key={i}
                                                            className={`text-lg ${i < review.rating
                                                                    ? "text-yellow-400"
                                                                    : "text-gray-300"
                                                                }`}
                                                        >
                                                            ★
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Review Comment */}
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                                {review.comment}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div>
                <h3 className="text-4xl font-cormorant font-semibold dark:text-gray-300 mb-4">
                    Related Products
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Placeholder for related products */}
                    {!loading ?
                        relatedProducts.slice(0, 4).map((relatedProduct) => (
                            <div
                                key={relatedProduct._id}
                                data-aos='fade-up'
                            >
                                <ProductCard product={relatedProduct} />
                            </div>
                        )) : (
                            <div className="col-span-full flex justify-center items-center">
                                <span className="loading loading-spinner loading-lg"></span>
                            </div>
                        )}
                </div>
            </div>

            <AddToCart
                isOpen={isCartOpen}
                setIsOpen={setIsCartOpen}
            />
        </section>
    );
};

export default SingleProduct;