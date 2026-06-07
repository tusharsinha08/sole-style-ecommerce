import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const EditUser = () => {
    const { id } = useParams();
    console.log(id);

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // Fetch Product
    const { data: editUser } = useQuery({
        queryKey: ["editUser", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/id/${id}`);
            return res.data;
        }
    });
    console.log("user:", editUser);


    const [previewImage, setPreviewImage] = useState(editUser?.image || "");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        if (editUser) {
            reset({
                name: editUser?.name,
                email: editUser?.email,
                address: editUser?.address,
                image: editUser?.image,
                role: editUser?.role
            })
        }
    }, [editUser, reset])

    useEffect(() => {
        if (editUser) {
            setPreviewImage(editUser?.image || "");
        }
    }, [editUser]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setPreviewImage(URL.createObjectURL(file));
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
            console.log("data: ", data);
            let imageUrl = editUser?.image || "";

            // Check if new image selected
            if (data.image?.length > 0) {
                const imageFile = data.image[0];

                // Validate image
                await validateImage(imageFile);

                // Upload to ImageBB
                const formData = new FormData();
                formData.append("image", imageFile);
                console.log("formdata:", formData);
                

                const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`;

                const imageRes = await axios.post(imageUploadUrl, formData, {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                });

                console.log('imga response: ', imageRes);

                imageUrl = imageRes.data.data.display_url;
            }
            console.log("imageUrl", imageUrl);
            

            const updatedUser = {
                name: data.name,
                address: data.address,
                image: imageUrl,
                role: data.role,
            };



            const res = await axiosSecure.patch(
                `/users/${editUser._id}`,
                updatedUser
            );
            console.log(res.data);


            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "User updated successfully",
                    timer: 2000,
                    showConfirmButton: false,
                });

                navigate("/admin/users");
            }
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Failed",
                text: "Failed to update user",
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold dark:text-white">
                        Edit User
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400">
                        Update user information and permissions
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {/* Image Preview */}
                    <div className="flex justify-center">
                        <div className="avatar">
                            <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img
                                    src={previewImage || editUser?.image}
                                    alt="User"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Name + Email */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Full Name
                                </span>
                            </label>

                            <input
                                type="text"
                                className="input input-bordered w-full dark:bg-gray-800"
                                defaultValue={editUser?.name}
                                {...register("name", {
                                    required: "Name is required",
                                })}
                            />

                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Email
                                </span>
                            </label>

                            <input
                                type="email"
                                readOnly
                                defaultValue={editUser?.email}
                                className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                                {...register("email")}
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="label">
                            <span className="label-text font-medium">
                                Address
                            </span>
                        </label>

                        <input
                            type="text"
                            defaultValue={editUser?.address}
                            className="input input-bordered w-full dark:bg-gray-800"
                            placeholder="Enter address"
                            {...register("address")}
                        />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="label">
                            <span className="label-text font-medium">
                                Profile Image
                            </span>
                        </label>

                        <input
                            type="file"
                            className="file-input file-input-bordered w-full dark:bg-gray-800"
                            {...register("image")}
                            onChange={handleImageChange}
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="label">
                            <span className="label-text font-medium">
                                Role
                            </span>
                        </label>

                        <select
                            className="select select-bordered w-full dark:bg-gray-800"
                            defaultValue={editUser?.role}
                            {...register("role", {
                                required: true,
                            })}
                        >
                            <option value="customer">
                                Customer
                            </option>

                            <option value="admin">
                                Admin
                            </option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="btn btn-outline"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn bg-neutral text-white hover:opacity-90"
                        >
                            {isSubmitting
                                ? "Updating..."
                                : "Update User"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;