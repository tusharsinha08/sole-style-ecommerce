import React from 'react';
import Hero from './Hero';
import PopularProducts from './PopularProducts';
import NewArrivals from './NewArrival';
import Accessories from './Accessories';
import BlazersCollection from './BlazersCollection';
import FeaturedItem from './FeaturedItem';
import Services from './Services';
import Reviews from './Reviews';
import ExploreMore from './ExploreMore';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <PopularProducts></PopularProducts>
            <Accessories></Accessories>
            <BlazersCollection></BlazersCollection>
            <FeaturedItem></FeaturedItem>
            <NewArrivals></NewArrivals>
            <Reviews></Reviews>
            <Services></Services>
            <ExploreMore></ExploreMore>
        </div>
    );
};

export default Home;