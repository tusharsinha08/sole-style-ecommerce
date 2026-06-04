import { useQuery } from "@tanstack/react-query";
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

    const {data = {}, isPanding: isLoading, refetch, } = useQuery({
        queryKey: [
            "products",
            type,
            category,
            search,
            sortType,
            page,
            limit,
        ],

        queryFn: async () => {
            const res = await axios.get("/products", {
                params: {
                    type: type || undefined,
                    category: category || undefined,
                    search: search || undefined,
                    sort: sortType || undefined,
                    page,
                    limit,
                },
            });

            return res.data;
        },

        keepPreviousData: true, // smooth pagination
        staleTime: 1000 * 60 * 5, // 5 min cache
    });

    return {
        products: data.products || [],
        result: data,
        isLoading,
        refetch,
    };
};

export default useProduct;