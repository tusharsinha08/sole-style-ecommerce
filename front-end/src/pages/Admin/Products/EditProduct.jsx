import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const [filesList, setFilesList] = useState([]);
    const [existingImages, setExistingImages] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { isSubmitting }
    } = useForm();

    // Fetch Product
    const { data: product, isLoading } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${id}`);
            return res.data;
        }
    });

    useEffect(() => {
        if (product) {
            reset({
                name: product.name,
                price: product.price,
                stock: product.stock,
                type: product.type,
                shortDescription: product.shortDescription,
                description: product.description,
                categories: product.categories || [],
                sizes: product.sizes || [],
                colors: product.colors || [],
            });

            setExistingImages(product.images || []);
        }
    }, [product, reset]);

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`;

        const res = await axios.post(imageUploadUrl, formData);

        return res.data.data.display_url;
    };

    const removeExistingImage = (index) => {
        setExistingImages((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    const removeNewImage = (index) => {
        setFilesList((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    const onSubmit = async (data) => {
        try {
            let newImageUrls = [];

            if (data.images?.length > 0) {
                const files = data.images.flat();

                newImageUrls = await Promise.all(
                    files.map((file) => uploadImage(file))
                );
            }

            const updatedProduct = {
                ...data,
                price: Number(data.price),
                stock: Number(data.stock),

                categories: data.categories || [],
                sizes: data.sizes || [],
                colors: data.colors || [],

                images: [
                    ...existingImages,
                    ...newImageUrls
                ]
            };

            const res = await axiosSecure.patch(
                `/products/${id}`,
                updatedProduct
            );
            

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Product Updated"
                });

                navigate("/admin/products");
            }
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Update Failed"
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow">

                <h2 className="text-2xl font-bold mb-6">
                    Edit Product
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    {/* Name */}
                    <input
                        {...register("name")}
                        className="input input-bordered w-full"
                        placeholder="Product Name"
                    />

                    {/* Price */}
                    <input
                        type="number"
                        {...register("price")}
                        className="input input-bordered w-full"
                        placeholder="Price"
                    />

                    {/* Type */}
                    <select
                        {...register("type")}
                        className="select select-bordered w-full"
                    >
                        <option value="women">Women</option>
                        <option value="man">Man</option>
                        <option value="kids">Kids</option>
                    </select>

                    {/* Stock */}
                    <input
                        type="number"
                        {...register("stock")}
                        className="input input-bordered w-full"
                        placeholder="Stock"
                    />

                    {/* Short Description */}
                    <input
                        {...register("shortDescription")}
                        className="input input-bordered w-full md:col-span-2"
                        placeholder="Short Description"
                    />

                    {/* Description */}
                    <textarea
                        {...register("description")}
                        rows={4}
                        className="textarea textarea-bordered w-full md:col-span-2"
                        placeholder="Description"
                    />

                    {/* Categories */}
                    <div className="md:col-span-2">
                        <label className="font-semibold block mb-2">
                            Categories
                        </label>

                        <div className="flex flex-wrap gap-3">
                            {[
                                "Men Fashion",
                                "Women Fashion",
                                "Kids Fashion",
                                "T-Shirts",
                                "Shirts",
                                "Polo Shirts",
                                "Drop Shoulder",
                                "Jeans",
                                "Trousers",
                                "Hoodies",
                                "Jackets",
                                "Streetwear",
                                "Casual Wear",
                                "Formal Wear",
                                "Sportswear",
                                "Graphic T-Shirts",
                                "New Arrival",
                                "Best Seller",
                                "Popular",
                                "Accessories"
                            ].map((item) => (
                                <label
                                    key={item}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type="checkbox"
                                        value={item}
                                        {...register("categories")}
                                        className="checkbox checkbox-sm"
                                    />
                                    {item}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Sizes */}
                    <div>
                        <label className="font-semibold block mb-2">
                            Sizes
                        </label>

                        <div className="flex flex-wrap gap-3">
                            {[
                                "XS",
                                "S",
                                "M",
                                "L",
                                "XL",
                                "XXL",
                                "XXXL",
                                "Free Size"
                            ].map((size) => (
                                <label
                                    key={size}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type="checkbox"
                                        value={size}
                                        {...register("sizes")}
                                        className="checkbox checkbox-sm"
                                    />
                                    {size}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Colors */}
                    <div>
                        <label className="font-semibold block mb-2">
                            Colors
                        </label>

                        <div className="flex flex-wrap gap-3">
                            {[
                                "Black",
                                "White",
                                "Red",
                                "Blue",
                                "Green",
                                "Undefined"
                            ].map((color) => (
                                <label
                                    key={color}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type="checkbox"
                                        value={color}
                                        {...register("colors")}
                                        className="checkbox checkbox-sm"
                                    />
                                    {color}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Existing Images */}
                    <div className="md:col-span-2">
                        <label className="font-semibold block mb-2">
                            Existing Images
                        </label>

                        <div className="flex flex-wrap gap-3">
                            {existingImages.map((img, index) => (
                                <div
                                    key={index}
                                    className="relative"
                                >
                                    <img
                                        src={img}
                                        alt=""
                                        className="w-24 h-24 rounded object-cover"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeExistingImage(index)
                                        }
                                        className="absolute top-0 right-0 bg-red-500 text-white px-2 rounded"
                                    >
                                        x
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upload New Images */}
                    <div className="md:col-span-2">
                        <label className="font-semibold block mb-2">
                            Add New Images
                        </label>

                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => {
                                const files = Array.from(
                                    e.target.files
                                );

                                setValue("images", [
                                    ...filesList,
                                    files
                                ]);

                                setFilesList((prev) => [
                                    ...prev,
                                    ...files
                                ]);
                            }}
                            className="file-input file-input-bordered"
                        />

                        <div className="flex flex-wrap gap-2 mt-2">
                            {filesList.map((file, index) => (
                                <span
                                    key={index}
                                    className="badge badge-outline"
                                >
                                    {file.name}

                                    <button
                                        type="button"
                                        className="ml-2"
                                        onClick={() =>
                                            removeNewImage(index)
                                        }
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-neutral md:col-span-2"
                    >
                        {isSubmitting
                            ? "Updating..."
                            : "Update Product"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;