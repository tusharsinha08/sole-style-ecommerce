import ProductCard from "../../components/ProductCard";
import { Link } from "react-router";
import useProduct from "../../hooks/useProduct";

const NewArrivals = () => {
    const category = 'New Arrival'
    const sortType = 'latest'

    const { products, isLoading } = useProduct({category, sortType})

    if (isLoading) {
        return (
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, index) => (
                        <div
                            key={index}
                            className="h-80 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"
                        ></div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-6 py-20 text-gray-900 dark:text-gray-300 dark:bg-gray-800">
            {/* Header */}
            <div className="text-center mb-14">
                <h2 className="text-4xl md:text-5xl font-bold font-cormorant italic mb-4">
                    New Arrivals
                </h2>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map((product, index) => (
                    <div
                        key={product._id}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewArrivals;