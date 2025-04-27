import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { adminService } from "../../../services/adminService";

export default function UsersEditPage() {
    const { id } = useParams(); // Get the admin ID from the URL

    const [formData, setFormData] = useState({
        user: "",
        email: "",
        role: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const response = await adminService.editAdmin(id, formData);
            console.log("Edits submitted successfully:", response);
            alert("Edits submitted successfully!");
        } catch (error) {
            console.error("Error submitting edits:", error);
            alert("Failed to submit edits. Please try again.");
        }
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await adminService.getAdminByID(id); // Fetch the post by ID
                setFormData(data);
            } catch (err) {
                alert("Failed to load the admin. Please try again.");
                console.error("Error fetching admin:", err);
            }
        };

        fetchPost();
    }, [id]);

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Admin Editor</h2>
            <p className="text-stone-600 p-2">
                Edi the data below to edit the Admin. Once done, click "Save Edits".
            </p>
            <form
                onSubmit={handleEdit}
                className="space-y-6 bg-white p-6 rounded-xl shadow-md"
            >
                {/* user */}
                <div className="flex flex-col">
                    <label htmlFor="user" className="text-sm font-medium text-stone-700 mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        name="user"
                        id="user"
                        value={formData.user}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-medium text-stone-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Role */}
                <div className="flex flex-col">
                    <label htmlFor="role" className="text-sm font-medium text-stone-700 mb-1">
                        Role
                    </label>
                    <select
                        name="role"
                        id="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    >
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {/* TODO: Reset Password */}

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-300 text-white rounded-md hover:bg-blue-400 transition font-medium"
                >
                    Save Edits
                </button>
            </form>
        </div>
    );
}