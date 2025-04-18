import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import resourceService from "../../../services/resourceService";

export default function ResourceEditPage() {
    const { id } = useParams(); // Get the resource ID from the URL

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        link: ""
    });

    const [error, setError] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        const fetchResource = async () => {
            try {
                const data = await resourceService.getResourceByID(id); // Fetch the resource by ID
                setFormData(data);
            } catch (err) {
                setError("Failed to load the resource. Please try again.");
                console.error("Error fetching resource:", err);
            }
        };

        fetchResource();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await resourceService.editResource(id, formData);
            console.log("Resource updated successfully:", response);
            alert(`Resource updated successfully!`); // Display success message
        } catch (error) {
            console.error("Error updating resource:", error.message);
            alert(error.message || "Failed to update resource. Please try again.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Edit Student Resource</h2>
            <p className="text-stone-600 p-2">
                Edit the data below to alter the student resource. Once done, click "Save Edits".
            </p>
            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white p-6 rounded-xl shadow-md"
            >
                {/* Resource Name */}
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
                    Save Edits
                </button>
            </form>
        </div>
    );
}
