import React from 'react';
import Hero from './Hero';
import PopularProducts from './PopularProducts';
import NewArrivals from './NewArrival';
import Accessories from './Accessories';
import BlazersCollection from './BlazersCollection';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <PopularProducts></PopularProducts>
            <Accessories></Accessories>
            <BlazersCollection></BlazersCollection>
            <NewArrivals></NewArrivals>
        </div>
    );
};

export default Home;