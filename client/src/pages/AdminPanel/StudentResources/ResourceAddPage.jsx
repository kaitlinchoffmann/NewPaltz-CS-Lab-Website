import { useState } from "react";
import studentResourceService from "../../../services/resourceService";

export default function StudentResourceAddPage() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        link: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const response = await studentResourceService.addResource(formData);
            console.log("Student resource added successfully:", response);
            alert(`Resource added successfully! ID: ${response.id}`); // Display the ID of the new resource
        } catch (error) {
            console.error("Error adding resource:", error.message);
            alert(error.message || "Failed to add resource. Please try again.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Create Student Resource</h2>
            <p className="text-stone-600 p-2">
                Fill in the details below to create a new student resource. Once done, click "Add Resource".
            </p>
            <form
                onSubmit={handleAdd}
                className="space-y-6 bg-white p-6 rounded-xl shadow-md"
            >
                {/* Name */}
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm font-medium text-stone-700 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col">
                    <label htmlFor="description" className="text-sm font-medium text-stone-700 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Website Link */}
                <div className="flex flex-col">
                    <label htmlFor="link" className="text-sm font-medium text-stone-700 mb-1">
                        Link to Resource (If Applicable)
                    </label>
                    <input
                        type="url"
                        name="link"
                        id="link"
                        value={formData.link}
                        onChange={handleChange}
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-300 text-white rounded-md hover:bg-blue-400 transition font-medium"
                >
                    Add Resource
                </button>
            </form>
        </div>
    );
}
