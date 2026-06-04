import { FaEdit, FaTrash } from "react-icons/fa";
import useProduct from "../../../hooks/useProduct";

const Products = () => {
    const { products } = useProduct();

    return (
        <div className="p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Manage Products
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        Total Products: {products?.length || 0}
                    </p>
                </div>

                <button className="px-5 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition">
                    Add Product
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow-md">
                <table className="table w-full">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Categories</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products?.map((product, index) => (
                            <tr
                                key={product._id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                            >
                                <td>{index + 1}</td>

                                {/* Product Image + Name */}
                                <td className="w-1/3">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="w-14 h-14 rounded-lg">
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-white">
                                                {product.name}
                                            </h4>
                                            <p className="text-xs">{product.shortDescription}</p>
                                        </div>
                                    </div>
                                </td>

                                {/* Category */}
                                <td>
                                    <span className="badge badge-outline">
                                        {product.category}
                                    </span>
                                </td>

                                {/* Stock */}
                                <td>
                                    {product.stock > 0 ? (
                                        <span className="badge badge-success">
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
                                    <span className="font-semibold text-green-600">
                                        ৳ {product.price}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td>
                                    <div className="flex justify-center gap-2">
                                        <button
                                            className="btn btn-sm btn-info text-white"
                                        >
                                            <FaEdit />
                                        </button>

                                        <button
                                            className="btn btn-sm btn-error text-white"
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
            </div>
        </div>
    );
};

export default Products;