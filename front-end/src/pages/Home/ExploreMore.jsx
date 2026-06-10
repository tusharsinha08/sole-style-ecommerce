import exploreImage from '../../assets/images/women_leftside_stand.jpg';
import { Link } from 'react-router-dom';

const ExploreMore = () => {
    return (
        <section
            className="relative min-h-screen bg-fixed bg-center bg-cover flex items-center"
            style={{
                backgroundImage: `url(${exploreImage})`,
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 dark:bg-black/70" />

            {/* Content Wrapper */}
            <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 flex justify-end">

                {/* Right Side Content */}
                <div className="max-w-xl text-right text-white space-y-6">

                    <h5 className="text-xs tracking-[0.3em] uppercase text-gray-300">
                        Explore
                    </h5>

                    <h2 className="text-4xl md:text-5xl font-light leading-tight">
                        Revamp your clothing style,
                        <span className="block font-semibold">
                            Enhance your personal wardrobe!
                        </span>
                    </h2>

                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                        Explore our collections today and experience the joy of fashion.
                        Shop now for the epitome of chic sophistication!
                    </p>

                    <Link
                        to="/products"
                        className="inline-block border border-white px-8 py-3 uppercase text-xs tracking-wider
                        hover:bg-white hover:text-black transition duration-300"
                    >
                        Shop Now
                    </Link>

                </div>
            </div>
        </section>
    );
};

export default ExploreMore;