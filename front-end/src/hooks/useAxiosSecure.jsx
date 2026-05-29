import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',  // instructions describing the data
    },
})

const useAxiosSecure = () => {
    // const { logOutUser } = useAuth()
    // const navigate = useNavigate()

    // Add a request interceptor
    axiosSecure.interceptors.request.use(
        function (config) {
            // Do something before request is sent
            const token = localStorage.getItem('access-token')
            config.headers.authorization = `Bearer ${token}`

            return config;
        },
        function (error) {
            // Do something with request error
            return Promise.reject(error);
        }
    );

    // Add a response interceptor
    axiosSecure.interceptors.response.use(
        function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        },
        function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            const status = error.response.status;
            if (status === 401 || status === 403){
                // todo: changed with better details ----------
                console.log("Un authorized, don't try next time");  
            }
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;