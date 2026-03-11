import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';

const PopularProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('products.json')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setProducts(data)
            setLoading(false)
        })
    }, [])

    const popular = products.filter(item => item.category === 'popular')
    console.log(popular);
    
    return (
        <section className='max-w-7xl mx-auto dark:bg-gray-800'>
            <div className='mb-12'>
                <h3 className='text-4xl md:text-4xl font-cormorant italic text-center mt-16 dark:text-gray-300'>Most Popular</h3>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6'>
                {
                    popular.map(product => <ProductCard
                        key={product._id}
                        product={product}
                    ></ProductCard>)
                }
            </div>
        </section>
    );
};

export default PopularProducts;