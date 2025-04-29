import { useState } from "react";
import { adminService } from "../../../services/adminService";

export default function UsersAddPage() {

    const [formData, setFormData] = useState({
        user: "",
        email: "",
        role: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        try {
            // Validate email availability
            const emailCheck = await adminService.checkEmailAvailability(formData.email);
            if (!emailCheck) {
                alert("Email already exists! Please use a different email.");
                return;
            }

            // Validate username availability
            const usernameCheck = await adminService.checkUsernameAvailability(formData.user);
            if (!usernameCheck) {
                alert("Username already exists! Please use a different username.");
                return;
            }

            // Validate password match
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            // Add admin
            const response = await adminService.addAdmin(formData);
            alert(`Admin added successfully! ID: ${response}`); // Display the ID of the new Admin
            window.location.href = "/admin-panel";
        } catch (error) {
            console.error("Error adding admin:", error);
            alert("An error occurred while adding the admin. Please try again.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Create a new Admin</h2>
            <p className="text-stone-600 p-2">
                Fill in the data below to create a new Admin. Once done, click "Create Admin".
            </p>
            <form
                onSubmit={handleAdd}
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

                {/*Password*/}
                <div className="flex flex-col">
                    <label htmlFor="password" className="text-sm font-medium text-stone-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/*Confirm Password*/}
                <div className="flex flex-col">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-stone-700 mb-1">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-300 text-white rounded-md hover:bg-blue-400 transition font-medium"
                >
                    Create Admin
                </button>
            </form>
        </div>
    );
}
