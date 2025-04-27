import React, { useState } from "react";
import studentHighlightService from "../../../services/studentHighlightService";

export default function StudentHighlightsAddPage() {

    const [formData, setFormData] = useState({
        project_title: "",
        student_name: "",
        project_description: "",
        summary: "",
        project_link: "",
        github_link: "",
        headshot_url: "",
    });

    const maxSummaryLength = 300;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await studentHighlightService.createPost(formData);
            console.log("Post created successfully:", response);
            alert("Post created successfully! Please Approve it in the admin panel.");
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post. Please try again.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Project Creator</h2>
            <p className="text-stone-600 p-2">
                Fill in the project details below. Once you're done, click "Create Post".
            </p>
            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white p-6 rounded-xl shadow-md"
            >
                {/* Title */}
                <div className="flex flex-col">
                    <label htmlFor="project_title" className="text-sm font-medium text-stone-700 mb-1">
                        Project Title
                    </label>
                    <input
                        type="text"
                        name="project_title"
                        id="project_title"
                        value={formData.project_title}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Author */}
                <div className="flex flex-col">
                    <label htmlFor="student_name" className="text-sm font-medium text-stone-700 mb-1">
                        Your Name
                    </label>
                    <input
                        type="text"
                        name="student_name" // Matches the key in formData
                        id="student_name"
                        value={formData.student_name} // Binds to formData.student_name
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Summary */}
                <div className="flex flex-col">
                    <label htmlFor="summary" className="text-sm font-medium text-stone-700 mb-1">
                        Project Summary <span className="text-stone-500">(max 300 characters)</span>
                    </label>
                    <textarea
                        name="summary"
                        id="summary"
                        rows={4}
                        maxLength={maxSummaryLength}
                        value={formData.summary}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300 resize-none"
                    />
                    <div className="text-right text-xs text-stone-500 mt-1">
                        {formData.summary.length}/{maxSummaryLength}
                    </div>
                </div>

                {/* Description */}
                <div className="flex flex-col">
                    <label htmlFor="project_description" className="text-sm font-medium text-stone-700 mb-1">
                        Project Full Description
                    </label>
                    <textarea
                        name="project_description" // Matches the key in formData
                        id="project_description"
                        rows={6}
                        value={formData.project_description} // Binds to formData.project_description
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300 resize-none"
                    />
                </div>

                {/* Website Link */}
                <div className="flex flex-col">
                    <label htmlFor="project_link" className="text-sm font-medium text-stone-700 mb-1">
                        Link to Website (If Applicable)
                    </label>
                    <input
                        type="url"
                        name="project_link" // Matches the key in formData
                        id="project_link"
                        value={formData.project_link} // Binds to formData.project_link
                        onChange={handleChange}
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* GitHub Link */}
                <div className="flex flex-col">
                    <label htmlFor="github_link" className="text-sm font-medium text-stone-700 mb-1">
                        Link to GitHub (If Applicable)
                    </label>
                    <input
                        type="url"
                        name="github_link" // Matches the key in formData
                        id="github_link"
                        value={formData.github_link || ""} // Binds to formData.github_link
                        onChange={handleChange}
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Headshot */}
                <div className="flex flex-col">
                    <label htmlFor="headshot_url" className="text-sm font-medium text-stone-700 mb-1">
                        Your Headshot
                    </label>
                    <input
                        type="file"
                        name="headshot_url" // Matches the key in formData
                        id="headshot_url"
                        accept="image/*"
                        onChange={handleChange}
                        className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                    />
                    {formData.headshot_url && (
                        <p className="text-xs text-stone-600 mt-1">
                            Selected: {formData.headshot_url}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-300 text-white rounded-md hover:bg-blue-400 transition font-medium"
                >
                    Create Post
                </button>
            </form>
        </div>
    );
}
