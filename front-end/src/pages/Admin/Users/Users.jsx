import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Users = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data: users = [], refetch, isPending: isLoading } = useQuery({
        queryKey: ['users', page, limit],
        queryFn: async () => {
            const res = await axiosSecure.get('/users', { params: { page, limit } })
            console.log(res.data);

            return res.data
        }
    })



    return (
        <div className="p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Manage Users
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400">
                        Total Users: {users?.length || 0}
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow-md">
                <table className="table w-full">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Role</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users?.map((user, index) => (
                            <tr
                                key={user._id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                            >
                                {/* Serial */}
                                <td>
                                    {(page - 1) * limit + index + 1}
                                </td>

                                {/* User */}
                                <td className='w-1/4'>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="w-8 h-8 rounded-full">
                                                <img
                                                    src={
                                                        user.image ||
                                                        "https://i.ibb.co/2kR4R6L/user.png"
                                                    }
                                                    alt={user.name}
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-sm text-gray-800 dark:text-white">
                                                {user.name}
                                            </h4>
                                        </div>
                                    </div>
                                </td>

                                {/* Email */}
                                <td>
                                    <span className="text-sm">
                                        {user.email}
                                    </span>
                                </td>

                                {/* Address */}
                                <td>
                                    <span className="text-sm">
                                        {user.address || "N/A"}
                                    </span>
                                </td>

                                {/* Role */}
                                <td>
                                    {user.role === "admin" ? (
                                        <span className="badge badge-neutral badge-xs">
                                            Admin
                                        </span>
                                    ) : (
                                        <span className="badge badge-ghost badge-xs">
                                            Customer
                                        </span>
                                    )}
                                </td>

                                {/* Actions */}
                                <td>
                                    <div className="flex justify-center gap-3">
                                        <Link
                                            to={`edit/${user._id}`}
                                            className="text-lg text-gray-600 hover:text-gray-800"
                                        >
                                            <FaEdit />
                                        </Link>

                                        <button
                                            // onClick={() => handleDeleteUser(user._id)}
                                            className="text-lg text-red-500 hover:text-red-700 cursor-pointer"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {users?.length === 0 && (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center py-10 text-gray-500"
                                >
                                    No Users Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="join join-horizontal w-full flex justify-center py-6">
                    <button
                        className="join-item btn border-0 dark:bg-gray-700 dark:text-gray-300"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        «
                    </button>

                    <button className="join-item px-4 border-y border-gray-500 dark:bg-gray-800 dark:text-gray-300">
                        Page {page}
                    </button>

                    <button
                        className="join-item btn border-0 dark:bg-gray-700 dark:text-gray-300"
                        disabled={page === users?.length / limit}
                        onClick={() => setPage(page + 1)}
                    >
                        »
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Users;