import { useEffect, useState } from 'react';
import useAxiosPublic from './useAxiosPublic';


const useProduct = ({ type, search, sortType, page }) => {
    const axios = useAxiosPublic();

    const [products, setProducts] = useState([]);
    const [result, setResult] = useState({});
    
    
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('/products', {
            params: {
                type,
                search,
                sort: sortType,
                page,
                limit: 10,
            }
        })
            .then(response => {
                console.log(response.data);
                setProducts(response.data.products);
                setResult(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, [type, search, sortType, page]);

    
    return [ products, result, loading];
};

export default useProduct;