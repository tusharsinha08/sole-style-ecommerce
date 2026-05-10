import React, { useState } from 'react';
import headerImage from '../../assets/images/women_header.jpg';
import axios from 'axios';

const Shop = () => {
    const [products, setProducts] = useState([]);

    axios.get('http://localhost:3000/products')
        .then(response => {
            console.log(response.data);
            setProducts(response.data);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });

    return (
        <section className='dark:bg-gray-800 py-12'>

            <div
                className="hero md:min-h-screen bg-fixed min-h-[50vh]"
                style={{
                    backgroundImage:
                        `url(${headerImage})`,
                }}
            >
                <div className="hero-overlay"></div>
                <div className=" text-neutral-content text-center">
                    <div className="max-w-3xl px-4">

                        <h1 className="mb-3 text-4xl md:text-6xl font-cormorant italic font-bold">Shop</h1>
                        <p className="mb-3 text-sm">Home {'>>'} Shop</p>
                    </div>
                </div>

            </div>

            <div className='max-w-7xl mx-auto mt-12 flex justify-between'>
                <p>Showing all {products.length} products</p>

                <select name="Default sorting" id="">
                    <option value="">Default sorting</option>
                    <option value="">Sort by popularity</option>
                    <option value="">Sort by latest</option>
                </select>
            </div>
        </section>
    );
};

export default Shop;