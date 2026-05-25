import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
    const { createUser, updateUserProfile } = useAuth();
    const axios = useAxiosPublic();

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const handleRegister = async (data) => {
        const { name, email, password } = data;

        try {
            await createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);

                updateUserProfile(name)
                .then(() => {
                    const userInfo = {
                        name: name,
                        email: email
                    }

                    axios.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                    })
                })
                .catch(error => console.log(error));

            })
            .catch(error =>  console.log(error))


            reset();
        }
        catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10">
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-8 md:p-10">

                {/* Heading */}
                <div className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
                        Register
                    </h1>

                    <p className="mt-3 text-gray-500 dark:text-gray-400">
                        Create a new account using your email.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(handleRegister)}
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
                            {...register("name", { required: true })}
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
                            placeholder="Create password"
                            className="input w-full mt-2 rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            {...register("password", { required: true })}
                        />
                    </div>

                    {/* Info */}
                    <div className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 border-l-2 border-gray-300 dark:border-gray-700 pl-4">
                        Your account will be created using your email and password.
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="btn w-full rounded-none border-0 bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 text-lg"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>

    );
};

export default Register;