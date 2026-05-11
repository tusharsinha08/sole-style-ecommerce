import React, { useEffect, useState } from 'react';
import headerImage from '../../assets/images/women_header.jpg';
import axios from 'axios';
import ProductCard from '../../components/ProductCard';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortType, setSortType] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3000/products')
            .then(response => {
                console.log(response.data);
                setProducts(response.data);
                setSortedProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    // Handle sorting
    const handleSort = (e) => {
        const value = e.target.value;
        setSortType(value);

        let sorted = [...products];

        switch (value) {
            case "popularity":
                sorted.sort((a, b) => b.popularity - a.popularity);
                break;

            case "latest":
                sorted.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                break;

            case "lowToHigh":
                sorted.sort((a, b) => a.price - b.price);
                break;

            case "highToLow":
                sorted.sort((a, b) => b.price - a.price);
                break;

            default:
                sorted = [...products];
        }

        setSortedProducts(sorted);
    };

    return (
        <section className='dark:bg-gray-800'>

            <div
                className="hero  bg-fixed min-h-[70vh]"
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

            <div className='max-w-7xl mx-auto mt-12'>
                <div className='md:flex md:justify-between my-6 p-6'>
                    <p>Showing all {products.length} products</p>

                    <select value={sortType} onChange={handleSort}>
                        <option value="">Default sorting</option>
                        <option value="popularity">Sort by popularity</option>
                        <option value="latest">Sort by latest</option>
                        <option value="lowToHigh">Sort by price: low to high</option>
                        <option value="highToLow">Sort by price: high to low</option>
                    </select>
                </div>

                <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 p-6'>
                    {
                        sortedProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default Shop;