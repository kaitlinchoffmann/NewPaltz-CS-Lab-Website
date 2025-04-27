import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import techBlogService from "../../../services/techBlogService";
export default function TechBlogEditPage() {
    const { id } = useParams(); // Get the post ID from the URL

    const [formData, setFormData] = useState({
        title: "",
        author_name: "",
        summary: "",
        external_link: "",
        image: "",
    });



    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await techBlogService.getArticleById(id); // Fetch the post by ID
                console.log("Fetched Data:", data);
                setFormData(data);
            } catch (err) {
                console.error("Error fetching post:", err);
            }
        };

        fetchPost();
    }, [id]);

    const maxSummaryLength = 300;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await techBlogService.editArticle(id, formData);
            console.log("Edits submitted successfully:", response);
            alert("Edits submitted successfully!");
        } catch (error) {
            console.error("Error submitting edits:", error);
            alert("Failed to submit edits. Please try again.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Article Editor</h2>
            <p className="text-stone-600 p-2">
                Fill in the article details below. Once you're done, click "Create Article".
            </p>
            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white p-6 rounded-xl shadow-md"
            >
                {/* Title */}
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-sm font-medium text-stone-700 mb-1">
                        Article Title
                    </label>
                    <input
                        type="text"
                        name="title" // Matches the key in formData
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Author */}
                <div className="flex flex-col">
                    <label htmlFor="author_name" className="text-sm font-medium text-stone-700 mb-1">
                        Author Name
                    </label>
                    <input
                        type="text"
                        name="author_name" // Matches the key in formData
                        id="author_name"
                        value={formData.author_name} // Binds to formData.student_name
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

                {/* External Link */}
                <div className="flex flex-col">
                    <label htmlFor="external_link" className="text-sm font-medium text-stone-700 mb-1">
                        Link to Article
                    </label>
                    <input
                        type="url"
                        name="external_link" // Matches the key in formData
                        id="external_link"
                        value={formData.external_link} // Binds to formData.project_link
                        onChange={handleChange}
                        required
                        placeholder="https://example.com"
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Featured Image */}
                <div className="flex flex-col">
                    <label htmlFor="image" className="text-sm font-medium text-stone-700 mb-1">
                        Featured Image
                    </label>
                    <input
                        type="file"
                        name="image" // Matches the key in formData
                        id="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                    />
                    {formData.image && (
                        <p className="text-xs text-stone-600 mt-1">
                            Selected: {formData.image}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-300 text-white rounded-md hover:bg-blue-400 transition font-medium"
                >
                    Create Article
                </button>
            </form>
        </div>
    );
}
