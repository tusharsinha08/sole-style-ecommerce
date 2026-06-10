import { Link } from "react-router-dom";
import aboutBanner from "../../assets/images/about.png";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useProduct from "../../hooks/useProduct";

const About = () => {

    const [user, setUser] = useState(null);

    const axios = useAxiosPublic();

    const { result } = useProduct()

    useEffect(() => {
        axios.get('/users')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
    }, []);

    return (
        <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <div
                className="hero bg-fixed min-h-[70vh]"
                style={{
                    backgroundImage: `url(${aboutBanner})`,
                }}
            >
                <div className="hero-overlay bg-black/60"></div>

                <div className="text-neutral-content text-center">
                    <div className="max-w-3xl px-4">
                        <h1 className="mb-3 text-4xl md:text-6xl font-cormorant italic font-bold">
                            About Us
                        </h1>
                        <p className="mb-3 text-sm md:text-base">
                            Home {'>>'} About Us
                        </p>
                    </div>
                </div>
            </div>

            {/* About Content */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* Image */}
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                            alt="Sole Style"
                            className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
                        />
                    </div>

                    {/* Text */}
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Welcome to Sole Style
                        </h2>

                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                            Sole Style is your trusted destination for premium
                            footwear. We are passionate about bringing together
                            fashion, comfort, and quality in every pair of shoes
                            we offer.
                        </p>

                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                            Whether you're searching for casual sneakers,
                            formal shoes, sports footwear, or the latest
                            fashion trends, Sole Style provides a seamless
                            shopping experience with carefully curated
                            collections from top brands.
                        </p>

                        <button className="border text-gray-900 py-3 px-6 bg-transparent uppercase text-xs hover:bg-gray-900 hover:text-gray-300 cursor-pointer dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-900">
                            <Link to="/products">Explore Collection</Link>
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-gray-100 dark:bg-gray-800 py-16">
                <div className="max-w-6xl mx-auto px-4">

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

                        <div>
                            <h3 className="text-4xl font-bold text-gray-900 dark:text-gray-300">
                                {user?.length || 10}K+
                            </h3>
                            <p className="mt-2">Happy Customers</p>
                        </div>

                        <div>
                            <h3 className="text-4xl font-bold text-gray-900 dark:text-gray-300">
                                {result?.totalProducts || 500}+
                            </h3>
                            <p className="mt-2">Products</p>
                        </div>

                        <div>
                            <h3 className="text-4xl font-bold text-gray-900 dark:text-gray-300">
                                {user?.length || 50}+
                            </h3>
                            <p className="mt-2">Top Brands</p>
                        </div>

                        <div>
                            <h3 className="text-4xl font-bold text-gray-900 dark:text-gray-300">
                                99%
                            </h3>
                            <p className="mt-2">Customer Satisfaction</p>
                        </div>

                    </div>

                </div>
            </section>

            {/* Why Choose Us */}
            <section className="max-w-7xl mx-auto px-4 py-20">

                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Why Choose Us
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
                        We strive to provide the best shopping experience with
                        quality products and excellent customer support.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">

                    <div className="card bg-base-100 dark:bg-gray-800 shadow-lg">
                        <div className="card-body text-center">
                            <h3 className="text-2xl font-semibold">
                                Premium Quality
                            </h3>
                            <p>
                                Carefully selected footwear made from high-quality materials.
                            </p>
                        </div>
                    </div>

                    <div className="card bg-base-100 dark:bg-gray-800 shadow-lg">
                        <div className="card-body text-center">
                            <h3 className="text-2xl font-semibold">
                                Fast Delivery
                            </h3>
                            <p>
                                Quick and reliable shipping to get your shoes on time.
                            </p>
                        </div>
                    </div>

                    <div className="card bg-base-100 dark:bg-gray-800 shadow-lg">
                        <div className="card-body text-center">
                            <h3 className="text-2xl font-semibold">
                                Secure Shopping
                            </h3>
                            <p>
                                Safe payment methods and customer data protection.
                            </p>
                        </div>
                    </div>

                </div>

            </section>

        </div>
    );
};

export default About;