import { FaEdit, FaTrash } from "react-icons/fa";
import useProduct from "../../../hooks/useProduct";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Products = () => {

    const [page, setPage] = useState(1)
    const limit = 10
    const { products, result, refetch } = useProduct({ limit, page });
    const axiosSecure = useAxiosSecure()

    const handleDeleteProduct = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Want to delete this product",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosSecure.delete(`/products/${id}`);

                    if (response.data.deletedCount > 0) {
                        await refetch();
                        Swal.fire({
                            toast: true,
                            position: "top-end",
                            text: "Item has been removed from cart.",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2000,
                            customClass: {
                                popup: 'w-56 p-1 text-sm'
                            }
                        });
                    }
                } catch (error) {
                    console.error('Error removing item:', error);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete item. Please try again.",
                        icon: "error"
                    });
                }
            }
        })
    }


    return (
        <div className="p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Manage Products
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        Total Products: {result?.totalProducts || 0}
                    </p>
                </div>

                <button className="btn bg-neutral text-white hover:opacity-80 transition">
                    <Link to={'add-product'}>Add Product</Link>
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow-md">
                <table className="table w-full">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Categories</th>
                            <th>Stock</th>
                            <th className="w-24">Price</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products?.map((product, index) => (
                            <tr
                                key={product._id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                            >
                                <td>{(page - 1) * limit + index + 1}</td>

                                {/* Product Image + Name */}
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="w-12 h-12 rounded-lg">
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-sm text-gray-800 dark:text-white">
                                                {product.name}
                                            </h4>
                                            <p className="text-xs">{product.shortDescription}</p>
                                        </div>
                                    </div>
                                </td>

                                {/* Category */}
                                <td>
                                    <span className="space-x-0.5 space-y-1">
                                        {
                                            product.categories.map(category => (
                                                <span key={category} className="badge badge-ghost badge-sm truncate">{category}</span>
                                            ))
                                        }
                                    </span>
                                </td>

                                {/* Stock */}
                                <td>
                                    {product.stock > 0 ? (
                                        <span className="badge badge-neutral badge-sm">
                                            {product.stock}
                                        </span>
                                    ) : (
                                        <span className="badge badge-error">
                                            Out of Stock
                                        </span>
                                    )}
                                </td>

                                {/* Price */}
                                <td>
                                    <span className="font-semibold text-sm text-green-600">
                                        ৳ {product.price}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td>
                                    <div className="flex justify-center gap-3">
                                        <button
                                            className="text-gray-600 text-lg cursor-pointer hover:text-gray-800"
                                        >
                                            <FaEdit />
                                        </button>

                                        <button onClick={() => handleDeleteProduct(product._id)}
                                            className="text-lg text-red-500 cursor-pointer hover:text-red-700"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {products?.length === 0 && (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center py-10 text-gray-500"
                                >
                                    No Products Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="join join-horizontal w-full flex justify-center py-6">
                    <button className="join-item btn border-0 dark:bg-gray-700 dark:text-gray-300"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >«</button>

                    <button className="join-item px-4 border-y-1 border-gray-500 dark:text-gray-300 dark:bg-gray-800">Page {page}</button>

                    <button className="join-item btn border-0 dark:bg-gray-700 dark:text-gray-300"
                        disabled={(page === result.totalPages)}
                        onClick={() => setPage(page + 1)}
                    >»</button>
                </div>
            </div>
        </div>
    );
};

export default Products;