// import React, { useEffect, useState } from 'react';
import headerImage from '../../assets/images/women_header.jpg';
import ProductCard from '../../components/ProductCard';
import { useSearchParams } from 'react-router-dom';
import useProduct from '../../hooks/useProduct';
import { useDebounce } from "use-debounce";
import useAOS from '../../hooks/useAos';
import { useEffect } from 'react';


const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // URL Params
    const type = searchParams.get("type") || "";
    const category = searchParams.get("category") || "";
    const sortType = searchParams.get("sort") || "";
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page")) || 1;
    const [debouncedSearch] = useDebounce(search, 2000);

    const { products, result, isLoading } = useProduct({ type, category, search: debouncedSearch, sortType, page });


    // Update URL Params
    const updateParams = (key, value) => {
        const params = new URLSearchParams(searchParams);

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        if (key === "search") {
            params.delete("type");
            params.delete("category");
            params.delete("sort");
            params.set("page", 1);
        }

        // reset page when filtering
        if (key !== "page") {
            params.set("page", 1);
        }
        setSearchParams(params);
    };

    const categoryList = ["T-Shirts", "Shirts", "Drop Shoulder", "Jeans", "Trousers", "Hoodies", "Jackets", "Streetwear", "Casual Wear", "Formal Wear", "Sportswear", "Graphic T-Shirts", "Accessories"
    ]

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <progress className="progress w-56"></progress>
            </div>
        );
    }

    return (
        <section className='dark:bg-gray-800 text-gray-900 dark:text-gray-400'>

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
                <div className='md:grid hidden md:grid-cols-4 gap-4 mx-4 my-12 items-center dark:text-gray-300 text-sm'>
                    <select
                        value={sortType}
                        onChange={(e) => updateParams("sort", e.target.value)}
                        className="select select-bordered dark:bg-gray-700 dark:text-gray-300">
                        <option value="">Default sorting</option>
                        <option value="popularity">Sort by popularity</option>
                        <option value="latest">Sort by latest</option>
                        <option value="lowToHigh">Sort by price: low to high</option>
                        <option value="highToLow">Sort by price: high to low</option>
                    </select>

                    <select
                        value={type}
                        onChange={(e) => updateParams("type", e.target.value)}
                        className="select select-bordered w-full max-w-xs dark:bg-gray-700 dark:text-gray-300">
                        <option value="">All Types</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kids">Kids</option>
                    </select>

                    <select
                        value={category}
                        onChange={(e) => updateParams("category", e.target.value)}
                        className="select select-bordered w-full max-w-xs dark:bg-gray-700 dark:text-gray-300">
                        <option value="">All Categories</option>
                        {
                            categoryList.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))
                        }
                    </select>

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
                            value={search}
                            onChange={(e) => updateParams("search", e.target.value)}
                        />
                    </label>

                    <div className='md:col-start-4 text-right'>
                        <p className='text-sm'>Showing {products.length} products of {result.totalProducts}</p>
                    </div>
                </div>

                {/* Mobile Search + Filter */}
                <div className="lg:hidden flex gap-3 mx-4 my-6" data-aos='fade-zoom'>
                    <label className="input flex-1 dark:bg-gray-700 dark:text-gray-300">
                        <svg
                            className="h-[1em] opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
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
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => updateParams("search", e.target.value)}
                        />
                    </label>

                    <button
                        className="btn btn-outline"
                        onClick={() => document.getElementById("filter_modal").showModal()}
                    >
                        Filters
                    </button>
                </div>


                <dialog id="filter_modal" className="modal">
                    <div className="modal-box dark:bg-gray-800 dark:text-gray-300">

                        <h3 className="font-bold text-lg mb-5">
                            Filter Products
                        </h3>

                        {/* Sort */}
                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text dark:text-gray-300">
                                    Sort By
                                </span>
                            </label>

                            <select
                                value={sortType}
                                onChange={(e) => updateParams("sort", e.target.value)}
                                className="select select-bordered w-full dark:bg-gray-700 dark:text-gray-300"
                            >
                                <option value="">Default sorting</option>
                                <option value="popularity">Sort by popularity</option>
                                <option value="latest">Sort by latest</option>
                                <option value="lowToHigh">Price: low to high</option>
                                <option value="highToLow">Price: high to low</option>
                            </select>
                        </div>

                        {/* Type */}
                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text dark:text-gray-300">
                                    Product Type
                                </span>
                            </label>

                            <select
                                value={type}
                                onChange={(e) => updateParams("type", e.target.value)}
                                className="select select-bordered w-full dark:bg-gray-700 dark:text-gray-300"
                            >
                                <option value="">All Types</option>
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                                <option value="kids">Kids</option>
                            </select>
                        </div>

                        {/* Category */}
                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text dark:text-gray-300">
                                    Category
                                </span>
                            </label>

                            <select
                                value={category}
                                onChange={(e) => updateParams("category", e.target.value)}
                                className="select select-bordered w-full dark:bg-gray-700 dark:text-gray-300"
                            >
                                <option value="">All Categories</option>
                                {
                                    categoryList.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="flex justify-between mt-6">
                            <button
                                className="btn btn-outline"
                                onClick={() => {
                                    updateParams("sort", "");
                                    updateParams("type", "");
                                    updateParams("category", "");
                                }}
                            >
                                Clear Filters
                            </button>

                            <form method="dialog">
                                <button className="btn btn-neutral">
                                    Apply
                                </button>
                            </form>
                        </div>
                    </div>

                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>


                {/* products mapping ------------------------------------- */}
                <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 p-6'>
                    {
                        products.map((product) => (
                            <div
                                key={product._id}
                                data-aos='fade-up'
                            >
                                <ProductCard product={product} />
                            </div>
                        ))
                    }
                </div>

                <div className="join join-horizontal w-full flex justify-center py-6">
                    <button className="join-item btn border-0 dark:bg-gray-700 dark:text-gray-300"
                        disabled={page === 1}
                        onClick={() => updateParams("page", page - 1)}
                    >«</button>

                    <button className="join-item px-4 border-y-1 border-gray-500 dark:text-gray-300 dark:bg-gray-800">Page {page}</button>

                    <button className="join-item btn border-0 dark:bg-gray-700 dark:text-gray-300"
                        disabled={(page === result.totalPages)}
                        onClick={() => updateParams("page", page + 1)}
                    >»</button>
                </div>
            </div>
        </section>
    );
};

export default Shop;