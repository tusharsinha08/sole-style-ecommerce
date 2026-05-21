import React, { useEffect, useState } from 'react';
import headerImage from '../../assets/images/women_header.jpg';
import axios from 'axios';
import ProductCard from '../../components/ProductCard';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [sortType, setSortType] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [result, setResult] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3000/products', {
            params: {
                search,
                sort: sortType,
                page,
                limit: 10
            }
        })
            .then(response => {
                console.log(response.data);
                setResult(response.data);
                setProducts(response.data.products);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, [search, sortType, page]);

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
                <div className='md:flex md:justify-between my-6 p-6 dark:text-gray-300'>
                    <p>Showing {products.length} products of {result.totalProducts}</p>

                    <label className="input dark:bg-gray-700 dark:text-gray-300 w-full max-w-xs">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input
                            type="search"
                            placeholder="Search"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </label>

                    <select value={sortType} onChange={(e) => setSortType(e.target.value)} className="select select-bordered w-full max-w-xs dark:bg-gray-700 dark:text-gray-300">
                        <option value="">Default sorting</option>
                        <option value="popularity">Sort by popularity</option>
                        <option value="latest">Sort by latest</option>
                        <option value="lowToHigh">Sort by price: low to high</option>
                        <option value="highToLow">Sort by price: high to low</option>
                    </select>
                </div>

                <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 p-6'>
                    {
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    }
                </div>

                <div className="join join-vertical md:join-horizontal w-full flex justify-center py-6">
                    <button className="join-item btn border-0 dark:bg-gray-700 dark:text-gray-300"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >«</button>
                    <button className="join-item p-4 btn border-0 dark:text-gray-300 dark:bg-gray-800">Page {page}</button>
                    <button className="join-item btn border-0 dark:bg-gray-700 dark:text-gray-300"
                        disabled={!(page === Math.ceil(products.length / 10))}
                        onClick={() => setPage(page + 1)}
                    >»</button>
                </div>
            </div>
        </section>
    );
};

export default Shop;