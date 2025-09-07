import { useState } from "react";
import sdFormService from "../../services/sdFormService";

export default function SubmitSDRequest() {

    const [formData, setFormData] = useState({
        // Initialize form fields here
        student_name: "",
        student_email: "",
        student_id: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await sdFormService.addForm(formData);
            alert("Thank you! Your request has been submitted and is awaiting admin review.");
        } catch (error) {
            alert("There was an error submitting your request. Please try again.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Submit a Server/Database Request</h2>
            <p className="text-stone-600 p-2">Please fill out the form below to request access to the server or database.</p>
            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white p-6 rounded-xl shadow-md"
            >
                {/* Student Name */}
                <div className="flex flex-col">
                    <label htmlFor="student_name" className="text-sm font-medium text-stone-700 mb-1">
                        Student Name
                    </label>
                    <input
                        type="text"
                        name="student_name"
                        id="student_name"
                        value={formData.student_name}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Student Email */}
                <div className="flex flex-col">
                    <label htmlFor="student_email" className="text-sm font-medium text-stone-700 mb-1">
                        Student Email
                    </label>
                    <input
                        type="email"
                        name="student_email"
                        id="student_email"
                        value={formData.student_email}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Student ID */}
                <div className="flex flex-col">
                    <label htmlFor="student_id" className="text-sm font-medium text-stone-700 mb-1">
                        Student ID
                    </label>
                    <input
                        type="text"
                        name="student_id"
                        id="student_id"
                        value={formData.student_id}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                :{/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Submit Request
                </button>
            </form>
        </div>

    )
}