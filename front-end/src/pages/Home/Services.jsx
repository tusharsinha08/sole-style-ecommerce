import { FaLock, FaShippingFast, FaUndoAlt } from "react-icons/fa";

const services = [
    {
        id: 1,
        title: "Secure Payment",
        desc: "All transactions are encrypted and protected with industry-standard security.",
        icon: <FaLock />,
    },
    {
        id: 2,
        title: "Free Shipping",
        desc: "Enjoy free shipping on all orders with fast and reliable delivery.",
        icon: <FaShippingFast />,
    },
    {
        id: 3,
        title: "Easy Returns",
        desc: "Hassle-free returns within 7 days for a smooth shopping experience.",
        icon: <FaUndoAlt />,
    },
];

const Services = () => {
    return (
        <section className="py-10 bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-6">
                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="group p-8 text-center
                            "
                        >
                            {/* Icon */}
                            <div className="flex justify-center mb-4 text-3xl text-gray-900 dark:text-white">
                                {service.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                {service.desc}
                            </p>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default Services;