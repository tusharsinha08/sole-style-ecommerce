import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { refetch, data: dbUser = {}} = useQuery({
        queryKey: ['dbUser', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/email/${user?.email}`)
            return res.data;
        }
    })
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [preview, setPreview] = useState(dbUser?.image || '');

    useEffect(() => {
        if (dbUser) {
            setPreview(dbUser?.image || "");
        }
    }, [dbUser]);
    
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
                resolve(true);
            };

            img.onerror = () => {
                reject("Invalid image file");
            };

            img.src = URL.createObjectURL(file);
        });
    };

    const onSubmit = async (data) => {
        try {
            let imageUrl = dbUser?.image || "";

            // Check if new image selected
            if (data.photo?.length > 0) {
                const imageFile = data.photo[0];

                // Validate image
                await validateImage(imageFile);

                // Upload to ImageBB
                const formData = new FormData();
                formData.append("image", imageFile);

                const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`;

                const imageRes = await axios.post(imageUploadUrl, formData, {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                }
                );

                imageUrl = imageRes.data.data.display_url;
            }

            const userInfo = {
                name: data.name,
                email: data.email,
                address: data.address,
                image: imageUrl,
                updatedAt: new Date(),
            };

            const res = await axiosSecure.patch("/users", userInfo);


            if (res.data) {
                Swal.fire({
                    icon: "success",
                    text: "Your profile is updated",
                    showConfirmButton: false,
                    timer: 1500,
                });
                refetch();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text:
                    typeof error === "string"
                        ? error
                        : error.message,
            });
        }
    };

    return (
        <div className=" mx-auto p-6">
            <div className="bg-white rounded-xl shadow-md p-8 dark:bg-gray-800 dark:text-gray-500">
                <h2 className="text-3xl text-gray-900 dark:text-gray-300 font-bold text-center mb-8">
                    My Profile
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {/* Profile Image */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-400">
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
                            className="file-input file-input-bordered file-input-neutral dark:file-input bg-gray-700 dark:bg-gray-600 dark:text-gray-300 w-full max-w-xs"
                        />
                    </div>

                    {/* Full Name */}
                    <div>
                        <label className="block text-gray-900 dark:text-gray-300 mb-2 font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            defaultValue={dbUser?.name || user?.displayName || ""}
                            {...register("name", {
                                required: "Name is required",
                            })}
                            className="w-full border bg-gray-100 text-gray-900 dark:text-gray-300 dark:bg-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
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
                        <label className="block text-gray-900 dark:text-gray-300 mb-2 font-medium">
                            Email Address
                        </label>

                        <input
                            type="email"
                            defaultValue={dbUser?.email || user?.email}
                            readOnly
                            {...register("email")}
                            className="w-full border bg-gray-300 text-gray-900 dark:text-gray-300 dark:bg-gray-700  rounded-lg px-4 py-3 cursor-not-allowed "
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-gray-900 dark:text-gray-300 mb-2 font-medium">
                            Address
                        </label>

                        <textarea
                            rows="4"
                            defaultValue={dbUser?.address || ""}
                            {...register("address")}
                            className="w-full border bg-gray-100 text-gray-900 dark:text-gray-300 dark:bg-gray-800  rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
                            placeholder="Enter your address"
                        />
                    </div>

                    {/* Save Button */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-neutral text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
                    >
                        Save Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MyProfile;