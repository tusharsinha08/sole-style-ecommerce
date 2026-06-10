import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';

const PopularProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/products?category=popular`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setLoading(false);
            });
    }, []);


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <progress className="progress w-56"></progress>
            </div>
        );
    }

    return (
        <section className='max-w-7xl mx-auto text-gray-900 dark:bg-gray-800 py-12'>
            <div className='mb-12 px-6'>
                <h3 className='text-4xl font-bold md:text-5xl font-cormorant italic text-center dark:text-gray-300'>
                    Most Popular
                </h3>
            </div>

            {products.length > 0 && (
                <div className='px-6'>
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={20}
                        slidesPerView={2}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                    >
                        {products.map(product => (
                            <SwiperSlide key={product._id}>
                                <ProductCard product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </section>
    );
};

export default PopularProducts;