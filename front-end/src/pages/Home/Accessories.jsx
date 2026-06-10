import { Link } from 'react-router-dom';
import headerImage from '../../assets/images/accessories.png';

const Accessories = () => {
    const product = {
        _id: '1',
        name: 'Explore our exquisite Bag Collection now!',
        image: 'https://i.ibb.co.com/ymcR9mFC/bag-hanging-from-furniture-item-indoors.jpg'
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
                <div className='w-86 text-center space-y-2 py-12 md:col-start-3'>
                    <img
                        src={product.image}
                        className='lg:w-full border h-[400px]  object-cover transition-transform duration-300'
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

        </section>
    );
};

export default Accessories;