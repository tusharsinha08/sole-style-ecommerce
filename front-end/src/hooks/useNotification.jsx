import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useNotification = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const {
        data: notifications = [],
        idPending: isLoading,
        refetch, } = useQuery({
            queryKey: ["notifications", user?.email],
            enabled: !!user?.email,
            queryFn: async () => {
                const res = await axiosSecure.get(`/notifications/${user.email}`);

                return res.data;
            },
        });

    return {notifications, isLoading, refetch};
};

export default useNotification;