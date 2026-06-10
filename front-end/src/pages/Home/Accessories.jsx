import { Link } from 'react-router-dom';
import headerImage from '../../assets/images/accessories.png';

const Accessories = () => {
    const product = {
        _id: '1',
        name: 'Excusive bag for Womens',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf'
    }

    return (
        <section
            className=''
        >
            <div className="hero mx-auto max-h-screen bg-fixed"
                style={{
                    backgroundImage:
                        `url(${headerImage})`,
                }}
            >
                <div className='min-h-[700px] items-center grid md:grid-cols-3'>
                    <div className='w-86 text-center space-y-2 py-12 col-start-3'>
                        <img
                            src={product.image}
                            className='w-full h-[400px]  object-cover transition-transform duration-300 group-hover:scale-105'
                            alt=""
                            loading="lazy"
                            decoding="async"
                        />
                        <p className='font-bold text-2xl text-center text-gray-300'>{product.name}</p>
                        <button className="border py-2 px-6 bg-transparent text-gray-300 uppercase text-xs hover:bg-gray-300 hover:text-gray-900 cursor-pointer">
                            <Link to={`/products?category=Accessories`}>
                                View Collection
                            </Link>
                        </button>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Accessories;