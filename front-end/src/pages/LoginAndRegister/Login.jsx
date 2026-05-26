import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const handleLogin = async (data) => {
        const { email, password } = data;

        try {
            await signInUser(email, password)
                .then(result => {
                    const user = result.user;
                    console.log(user);
                    
                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        icon: "success",
                        title:  `Welcome ${user.displayName}`,
                        showConfirmButton: false,
                        timer: 1500,
                        customClass: {
                            popup: 'w-56 p-2 text-sm'
                        }
                    });
                    
                    navigate(from, { replace: true })
                })

            reset();
        }
        catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10">
            <div className=" border w-1/2 mx-auto items-center border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-10">

                {/* Heading */}
                <div className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
                        Sign In
                    </h1>

                    <p className="mt-3 text-gray-500 dark:text-gray-400">
                        Welcome back! Please login to your account.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(handleLogin)}
                    className="space-y-6"
                >

                    {/* Email */}
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400">
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input w-full mt-2 rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            {...register("email", { required: true })}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="input w-full mt-2 rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            {...register("password", { required: true })}
                        />
                    </div>

                    {/* Forgot */}
                    <div className="flex justify-end">
                        <a className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition">
                            Forgot password?
                        </a>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="btn w-full rounded-none border-0 bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 text-lg"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-500 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link to={'/register'} className="text-black dark:text-white font-bold hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>

    );
};

export default Login;