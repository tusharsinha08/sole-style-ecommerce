import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { name, type, image, price } = product;
    return (

        <div className="text-center  w-full ">
            <figure className='h-80 w-full mb-2'>
                <Link to={'/shop'}>
                    <img
                        className='w-full h-full'
                        src={image}
                        alt="Shoes" />
                </Link>
            </figure>
            <div className="text-center space-y-1">
                <p className='capitalize text-gray-500 text-sm '>{type}</p>
                <h2 className="font-bold dark:text-white">{name}</h2>
                <p className='font-semibold text-gray-500'>$ {price}</p>
            </div>
        </div>
    );
};

export default ProductCard;