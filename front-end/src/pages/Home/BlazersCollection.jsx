import { Link } from 'react-router-dom';
import blazerImage from '../../assets/images/women_with_blazer.png';

const BlazersCollection = () => {
    return (
        <section className="min-h-screen dark:bg-gray-800">
            <div className="mx-auto h-screen">
                
                <div className="grid grid-cols-2 h-full">

                    {/* Content */}
                    <div className="flex items-center justify-center px-4 lg:px-12">
                        <div className="space-y-6 max-w-md">
                            
                            <span className="inline-block text-xs md:tracking-[0.3em] uppercase text-gray-500">
                                Work & Office Attire
                            </span>

                            <h2 className="text-3xl md:text-4xl lg:text-6xl font-cormorant text-gray-900 dark:text-white italic leading-tight">
                                Professional
                                <span className="block font-semibold not-italic">
                                    Pinstripe Blazers
                                </span>
                            </h2>

                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base lg:text-lg">
                                Elevate your workwear with our Professional Pinstripe Blazers Collection,
                                where tailored sophistication meets modern confidence for a polished office look.
                            </p>

                            <Link
                                to="/products?category=blazer"
                                className="inline-block border text-gray-900 dark:text-gray-300 dark:border-gray-300 px-6 py-2 uppercase text-sm md:text-lg tracking-wider hover:bg-gray-900 dark:hover:bg-gray-300 hover:text-gray-300 dark:hover:text-gray-900 transition"
                            >
                                Shop Now
                            </Link>

                        </div>
                    </div>

                    {/* Image (always cover right column) */}
                    <div className="relative h-full overflow-hidden">
                        <img
                            src={blazerImage}
                            alt="Professional Blazer Collection"
                            loading="lazy"
                            className="w-full h-full object-cover object-center"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BlazersCollection;