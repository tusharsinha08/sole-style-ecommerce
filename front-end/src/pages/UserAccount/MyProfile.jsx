import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const MyProfile = () => {
    const { user, dbUser } = useAuth();
    console.log('user: ', user, '\ndbUser: ', dbUser);


    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (user) {
            setValue("name", dbUser?.name || user.displayName || "");
            setValue("email", user.email || "");
            setPreview(dbUser?.photo || null);
        }
    }, [user, dbUser, setValue]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const validateImage = (file) => {
        return new Promise((resolve, reject) => {

            if (file.size > 1024 * 1024) {
                reject("Image size must be less than 1MB");
                return;
            }

            const img = new Image();

            img.onload = () => {
                if (img.width > 400 || img.height > 400) {
                    reject("Image dimensions must be less than or equal to 400x400 pixels");
                    return;
                }

                resolve(true);
            };

            img.onerror = () => {
                reject("Invalid image file");
            };

            img.src = URL.createObjectURL(file);
        });
    };

    const onSubmit = async (data) => {
        console.log("Profile Data:", data);

        // Upload image logic here
        // Update profile logic here

        // Example:
        // const image = data.photo[0];
        // upload image -> get image URL
        // save profile data to database
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-3xl font-bold text-center mb-8">
                    My Profile
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {/* Profile Image */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
                            <img
                                src={
                                    preview ||
                                    "https://i.ibb.co/4pDNDk1/avatar.png"
                                }
                                alt="Profile Preview"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            {...register("photo")}
                            onChange={handleImageChange}
                            className="file-input file-input-bordered w-full max-w-xs"
                        />
                    </div>

                    {/* Full Name */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            {...register("name", {
                                required: "Name is required",
                            })}
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
                            placeholder="Enter your full name"
                        />

                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Email Address
                        </label>

                        <input
                            type="email"
                            readOnly
                            {...register("email")}
                            className="w-full border rounded-lg px-4 py-3 bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Address
                        </label>

                        <textarea
                            rows="4"
                            {...register("address")}
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
                            placeholder="Enter your address"
                        />
                    </div>

                    {/* Save Button */}
                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                    >
                        Save Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MyProfile;