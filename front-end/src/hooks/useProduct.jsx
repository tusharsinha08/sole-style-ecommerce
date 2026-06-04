import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useProduct = (params = {}) => {
    const axios = useAxiosPublic();

    const {
        type = "",
        category = "",
        search = "",
        sortType = "",
        page = 1,
        limit = 12,
    } = params;

    const [products, setProducts] = useState([]);
    const [result, setResult] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/products", {
            params: {
                type: type || undefined,
                category: category || undefined,
                search: search || undefined,
                sort: sortType || undefined,
                page,
                limit,
            },
        })
            .then((response) => {
                setProducts(response.data.products || []);
                setResult(response.data || {});
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [type, category, search, sortType, page, limit]);

    return { products, result, loading };
};

export default useProduct;