import { Link } from 'react-router-dom';
import featuredCover from '../../assets/images/cover_featured.png';

const FeaturedItem = () => {
    const product = {
        _id: '1',
        name: 'Discover the allure of fashion reinvented!',
        description: 'Dive into a world of style with our latest collection! Shop now and redefine your wardrobe narrative!',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf'
    };

    return (
        <section className="relative min-h-[700px] flex items-center overflow-visible">

            {/* Background */}
            <div
                className="absolute inset-0 bg-fixed bg-center bg-cover"
                style={{
                    backgroundImage: `url(${featuredCover})`,
                }}
            />

            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content Container */}
            <div className="relative w-full max-w-6xl px-6 lg:px-12 flex items-center">

                <div className="w-full md:w-1/2 relative">

                    {/* Floating Card */}
                    <div className="relative mx-auto lg:-top-10 md:-top-16 -top-10 flex justify-center space-y-4 px-6">

                        {/* Floating Image */}
                        <div className="space-y-2">
                            <img
                                src={product.image}
                                alt={product.name}
                                loading="lazy"
                                className="w-full h-[600px] object-cover -mt-24"
                            />
                            <p className="font-bold text-xl md:text-2xl text-white">
                                {product.name}
                            </p>
                            <p className="text-sm md:text-xl text-white">
                                {product.name}
                            </p>

                            <Link
                                to={`/products?category=best+seller`}
                                className="inline-block border border-white text-white px-6 py-2 uppercase text-xs tracking-wider hover:bg-white hover:text-black transition"
                            >
                                View Collection
                            </Link>
                        </div>


                    </div>

                </div>

            </div>
        </section>
    );
};

export default FeaturedItem;