import { FaStar } from 'react-icons/fa6';
import reviewCover from '../../assets/images/customer_review_cover.png';

const Reviews = () => {
    return (
        <section
            className="relative min-h-screen flex items-center justify-center bg-fixed bg-center bg-cover"
            style={{
                backgroundImage: `url(${reviewCover})`,
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/70 dark:bg-black/80" />

            {/* Content */}
            <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
                {/* Stars */}
                <div className="flex justify-center mb-6 space-x-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                    ))}
                </div>
                {/* Quote */}
                <p className="text-lg md:text-2xl leading-relaxed font-light italic">
                    “SoleStyle is my fashion sanctuary! The curated collection
                    effortlessly blends chic trends with timeless elegance, making every
                    purchase a delightful discovery. The quality of their pieces is
                    unmatched, and I appreciate the brand's commitment to sustainable
                    fashion. What truly sets FemmeWardrobe apart is their customer-centric approach.”
                </p>

                {/* Divider */}
                <div className="w-20 h-[2px] bg-white/60 mx-auto my-8"></div>

                {/* Author */}
                <h4 className="text-sm md:text-base uppercase tracking-widest text-gray-200">
                    — Olivia Bennett
                </h4>

            </div>
        </section>
    );
};

export default Reviews;