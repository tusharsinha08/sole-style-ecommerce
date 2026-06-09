import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const useAOS = (config = {}) => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 80,
            easing: "ease-out",
            ...config, // allow override if needed
        });
    }, [config]);

    // refresh helper for dynamic data (API, pagination, etc.)
    const refreshAOS = () => {
        AOS.refresh();
    };

    return { refreshAOS };
};

export default useAOS;