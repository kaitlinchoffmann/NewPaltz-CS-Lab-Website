import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import faqService from "../../../services/faqService";

export default function FAQEditPage() {
    const { id } = useParams(); // Get the post ID from the URL

    const [formData, setFormData] = useState({
        question: "",
        answer: "",
        link: ""
    });

    const [error, setError] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await faqService.getFaqByID(id); // Fetch the FAQ by ID
                setFormData(data);
            } catch (err) {
                setError("Failed to load the FAQ. Please try again.");
                console.error("Error fetching FAQ:", err);
            }
        };

        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await faqService.editFAQ(id, formData);
            alert(`FAQ Updated successfully!`); // Display the ID of the new FAQ
            window.location.href = "/admin-panel";
        } catch (error) {
            console.error("Error adding FAQ:", error.message);
            alert(error.message || "Failed to Update FAQ. Please try again.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Edit FAQ</h2>
            <p className="text-stone-600 p-2">
                Edit the data below to alter the FAQ. Once done, click "Save Edits".
            </p>
            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white p-6 rounded-xl shadow-md"
            >
                {/* Question */}
                <div className="flex flex-col">
                    <label htmlFor="question" className="text-sm font-medium text-stone-700 mb-1">
                        Question
                    </label>
                    <input
                        type="text"
                        name="question"
                        id="question"
                        value={formData.question}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Answer */}
                <div className="flex flex-col">
                    <label htmlFor="answer" className="text-sm font-medium text-stone-700 mb-1">
                        Answer
                    </label>
                    <input
                        type="text"
                        name="answer"
                        id="answer"
                        value={formData.answer}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Website Link */}
                <div className="flex flex-col">
                    <label htmlFor="link" className="text-sm font-medium text-stone-700 mb-1">
                        Link to "More Information" (If Applicable)
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
