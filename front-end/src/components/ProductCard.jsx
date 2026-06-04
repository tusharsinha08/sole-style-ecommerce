import React from 'react';
import { Link } from 'react-router-dom';
import useScrollToTop from '../hooks/useScrollToTop';

const ProductCard = ({ product }) => {
    const { name, categories, images, price, shortDescription } = product;
    const scrollToTop = useScrollToTop();

    return (

        <div className="text-center w-full ">

            {/* IMAGE WRAPPER */}
            <figure className='h-80 w-full mb-2 relative group overflow-hidden'>

                <div>
                    <Link to={`/products/${product._id}`}>
                        <img
                            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                            src={images[0]}
                            alt=""
                        />
                    </Link>
                </div>

                {/* HOVER OVERLAY */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center p-4">

                    {/* short description */}
                    <p className="text-white text-xs mb-3 line-clamp-3">
                        {shortDescription}
                    </p>

                    {/* button */}
                    <Link
                        to={`/products/${product._id}`}
                        onClick={scrollToTop}
                        className="border py-2 px-6 bg-transparent text-white uppercase text-xs hover:bg-white hover:text-black cursor-pointer"
                    >
                        View Details
                    </Link>
                </div>

            </figure>

            {/* TEXT SECTION (UNCHANGED) */}
            <div className="text-center space-y-1">
                <p className='capitalize text-gray-500 text-sm '>{categories[0]}</p>
                <h2 className="font-bold dark:text-white">{name}</h2>
                <p className='font-semibold text-gray-500'>$ {price}</p>
            </div>

        </div>
    );
};

export default ProductCard;