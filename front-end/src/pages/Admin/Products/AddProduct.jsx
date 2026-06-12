import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { MdAdd } from "react-icons/md";
import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm();
    const [filesList, setFilesList] = useState([]);


    const handleRemoveImage = (index) => {
        setFilesList(prev =>
            prev.filter((_, i) => i !== index)
        );
    }

    const uploadImage = async (file) => {
        if (!file || !(file instanceof File)) {
            console.error("Invalid file detected:", file);
            return null;
        }
        // Upload to ImageBB
        const formData = new FormData();
        formData.append("image", file);

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`;

        const imageRes = await axios.post(imageUploadUrl, formData);

        const imgUrl = imageRes.data.data.display_url

        return imgUrl;
    }

    const onSubmit = async (data) => {

        try {
            console.log(data);

            let imageUrls = []

            if (data.images?.length > 0) {
                // const files = Array.from(data.images);
                const files = data.images
                imageUrls = await Promise.all(
                    files.map(file => uploadImage(file))
                )
            }

            const payload = {
                ...data,
                price: Number(data.price),
                stock: Number(data.stock),
                rating: Number(data.rating || 5),

                categories: data.categories || [],
                sizes: data.sizes || [],
                colors: data.colors || [],

                images: imageUrls,
                reviews: []
            };

            const res = await axiosSecure.post("/products", payload);

            if (res.data.insertedId) {
                await reset();
                setFilesList([])
                Swal.fire({
                    icon: "success",
                    title: "Product Added!"
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Upload failed"
            });
        }
    };

    const categories = [
        "Men Fashion",
        "Women Fashion",
        "Kids Fashion",
        "T-Shirts",
        "Shirts",
        "Jersey",
        "Polo Shirts",
        "Drop Shoulder",
        "Jeans",
        "Trousers",
        "Hoodies",
        "Blazer",
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
    ]

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <div className="max-w-4xl mx-auto p-6 rounded-sm">

                <h2 className="text-2xl font-bold mb-6">
                    Add New Product
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >

                    {/* Name */}
                    <input
                        {...register("name", { required: true })}
                        placeholder="Product Name"
                        className="input input-bordered bg-gray-200 dark:bg-gray-700 w-full"
                    />

                    {/* Price */}
                    <input
                        type="number"
                        {...register("price", { required: true })}
                        placeholder="Price"
                        className="input input-bordered bg-gray-200 dark:bg-gray-700 w-full"
                    />

                    {/* Type */}
                    <select
                        {...register("type", { required: true })}
                        defaultValue={''}
                        className="select select-bordered bg-gray-200 dark:bg-gray-700 w-full"
                    >
                        <option value="" disabled>Select Type</option>
                        <option value="women">Women</option>
                        <option value="men">Men</option>
                        <option value="kids">Kids</option>
                    </select>

                    {/* Stock */}
                    <input
                        type="number"
                        {...register("stock")}
                        placeholder="Stock"
                        className="input input-bordered bg-gray-200 dark:bg-gray-700 w-full"
                    />

                    {/* Short Description */}
                    <input
                        {...register("shortDescription")}
                        placeholder="Short Description"
                        className="input input-bordered bg-gray-200 dark:bg-gray-700 w-full md:col-span-2"
                    />

                    {/* Description */}
                    <textarea
                        {...register("description")}
                        placeholder="Full Description"
                        className="textarea textarea-bordered bg-gray-200 dark:bg-gray-700 w-full md:col-span-2"
                        rows={4}
                    />

                    {/* Categories */}
                    <div className="md:col-span-2">
                        <label className="font-medium mb-2 block">Categories</label>

                        <div className="flex flex-wrap text-sm gap-2">
                            {categories.map((category) => (
                                <label
                                    key={category}
                                    className="label cursor-pointer justify-start gap-2"
                                >
                                    <input
                                        type="checkbox"
                                        value={category}
                                        {...register("categories")}
                                        className="checkbox bg-gray-300 text-gray-900 dark:text-gray-300 dark:bg-gray-700 checkbox-xs"
                                    />
                                    <span>{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Sizes */}
                    <div>
                        <label className="font-medium mb-2 block">Sizes</label>

                        <div className="flex flex-wrap gap-2 text-sm">
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
                                    className="label cursor-pointer justify-start gap-2"
                                >
                                    <input
                                        type="checkbox"
                                        value={size}
                                        {...register("sizes")}
                                        className="checkbox checkbox-xs bg-gray-300 text-gray-900 dark:text-gray-300 dark:bg-gray-700"
                                    />
                                    <span>{size}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Colors */}
                    <div>
                        <label className="font-medium mb-2 block">Colors</label>

                        <div className="flex flex-wrap gap-2 text-sm">
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
                                    className="label cursor-pointer justify-start gap-2"
                                >
                                    <input
                                        type="checkbox"
                                        value={color}
                                        {...register("colors")}
                                        className="checkbox checkbox-xs bg-gray-300 text-gray-900 dark:text-gray-300 dark:bg-gray-700"
                                    />
                                    <span>{color}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Images */}
                    <div className="space-y-2">
                        <label className="font-medium mb-2 block">Upload Images</label>

                        {/* file names */}
                        {filesList.length > 0 && (
                            <div className="flex flex-wrap gap-3">
                                {filesList.map((img, index) => (
                                    <div
                                        key={index}
                                        className="relative"
                                    >
                                        <img
                                            src={URL.createObjectURL(img)}
                                            alt=""
                                            className="w-24 h-24 rounded object-cover"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveImage(index)
                                            }
                                            className="absolute top-0 right-0 bg-red-500 text-white px-2 rounded"
                                        >
                                            x
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {/* <input
                            type="file"
                            accept="image/*"
                            multiple
                            {...register("images")}
                            onChange={handleFileChange}
                            className="file-input file-input-bordered bg-gray-200 dark:bg-gray-700 dark:bg-gray-600 w-full max-w-xs"
                        /> */}

                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                                const newFiles = Array.from(e.target.files || []);

                                const updatedFiles = [...filesList, ...newFiles];

                                setFilesList(updatedFiles);
                                setValue("images", updatedFiles);
                            }}
                            className="file-input file-input-bordered bg-gray-200 dark:bg-gray-700 w-full max-w-xs"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn bg-neutral hover:opacity-80 text-white w-full md:col-span-2"
                    >
                        {isSubmitting ? "Adding..." : "Add Product"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;