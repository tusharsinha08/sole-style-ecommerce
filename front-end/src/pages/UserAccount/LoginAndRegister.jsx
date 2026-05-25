import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";

const LoginAndRegister = () => {
    const { createUser, signInUser } = useAuth();

    // react-hook-form
    const {
        register: loginRegister,
        handleSubmit: handleLoginSubmit,
        reset: resetLogin
    } = useForm();

    const {
        register: registerRegister,
        handleSubmit: handleRegisterSubmit,
        reset: resetRegister
    } = useForm();

    // Login
    const handleLogin = async (data) => {
        const { email, password } = data;

        try {
            const result = await signInUser(email, password);
            console.log(result.user);
            resetLogin();
        } catch (error) {
            console.log(error.message);
        }
    };

    // Register
    const handleRegister = async (data) => {
        const { email, password } = data;

        try {
            const result = await createUser(email, password);
            console.log(result.user);
            resetRegister();
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* LOGIN */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-10">

                    <div className="mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
                            Sign In
                        </h1>
                        <p className="mt-3 text-gray-500 dark:text-gray-400">
                            Welcome back! Please login to your account.
                        </p>
                    </div>

                    <form
                        onSubmit={handleLoginSubmit(handleLogin)}
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
                                {...loginRegister("email", { required: true })}
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
                                {...loginRegister("password", { required: true })}
                            />
                        </div>

                        <div className="flex justify-end">
                            <a className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="btn w-full rounded-none border-0 bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 text-lg"
                        >
                            Login
                        </button>
                    </form>
                </div>

                {/* REGISTER */}
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-8 md:p-10">

                    <div className="mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
                            Register
                        </h1>
                        <p className="mt-3 text-gray-500 dark:text-gray-400">
                            Create a new account using your email.
                        </p>
                    </div>

                    <form
                        onSubmit={handleRegisterSubmit(handleRegister)}
                        className="space-y-6"
                    >

                        {/* Name */}
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400">
                                Full Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="input w-full mt-2 rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                {...registerRegister("name", { required: true })}
                            />
                        </div>
                        
                        {/* Email */}
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input w-full mt-2 rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                {...registerRegister("email", { required: true })}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Create password"
                                className="input w-full mt-2 rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                {...registerRegister("password", { required: true })}
                            />
                        </div>

                        <div className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 border-l-2 border-gray-300 dark:border-gray-700 pl-4">
                            Your account will be created using your email and password.
                        </div>

                        <button
                            type="submit"
                            className="btn w-full rounded-none border-0 bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 text-lg"
                        >
                            Register
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default LoginAndRegister;