import React from 'react';

const useScrollToTop = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Use 'auto' for instant scroll without animation
        });
    };

    return scrollToTop;
};

export default useScrollToTop;