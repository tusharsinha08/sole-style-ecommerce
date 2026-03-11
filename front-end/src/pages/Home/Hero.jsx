import React from 'react';

const Hero = () => {
    return (
        <div
            className="hero min-h-screen bg-fixed"
            style={{
                backgroundImage:
                    "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
            }}
        >
            <div className="hero-overlay"></div>
            <div className=" text-neutral-content text-center">
                <div className="max-w-3xl px-4">
                    <p className="text-sm">
                        Casual & Everyday
                    </p>
                    <h1 className="mb-3 text-4xl md:text-6xl font-cormorant italic font-bold">Effortlessly blend comfort & style!</h1>
                    <p className="mb-3 text-sm">
                        Effortlessly blend comfort and style with our Casual & Everyday collection, featuring cozy sweaters, versatile denim, laid-back tees, and relaxed-fit joggers for your everyday adventures
                    </p>
                    <button className="border py-2 px-6 bg-transparent text-white uppercase text-xs hover:bg-white hover:text-black cursor-pointer">View Collection</button>
                </div>
            </div>
        </div>
    );
};

export default Hero;