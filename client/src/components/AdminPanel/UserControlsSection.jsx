import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function UserControlsSection({ admins, handleDelete }) {


    return (
        <div className="flex-col justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-stone-700 mb-4">User Controls</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-stone-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Username</th>
                            <th className="px-4 py-2 border-b">Email</th>
                            <th className="px-4 py-2 border-b">Role</th>
                            <th className="px-4 py-2 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin) => (
                            <tr key={admin.id} className="text-center">
                                <td className="px-4 py-2 border-b">{admin.user}</td>
                                <td className="px-4 py-2 border-b">{admin.email}</td>
                                <td className="px-4 py-2 border-b">{admin.role}</td>
                                <td className="px-4 py-2 border-b">
                                    <Link to={`/admin-panel/users/edit-admin/${admin.id}`}
                                        className="bg-green-300 rounded px-3 py-1 hover:bg-green-400 mr-2 transition-all ease-in duration-300">Edit</Link>
                                    <button
                                        onClick={() => handleDelete(admin.id)}
                                        className="bg-rose-300 rounded px-3 py-1 hover:bg-rose-400 transition-all ease-in duration-300">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        </div>
    )
}