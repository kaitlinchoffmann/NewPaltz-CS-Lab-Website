import { useState } from "react";
import sdFormService from "../../services/sdFormService";

export default function SubmitSDRequest() {
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        student_id: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        student_id: "",
    });

    const validateField = (name, value) => {
        switch (name) {
            case "email":
                if (!value.endsWith("@newpaltz.edu")) {
                    return "Email must end with @newpaltz.edu";
                }
                return "";
            case "student_id":
                if (!/^N\d{8}$/.test(value)) {
                    return "Student ID must start with 'N' followed by 8 digits";
                }
                return "";
            default:
                return "";
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Real-time validation
        const errorMsg = validateField(name, value);
        setErrors({ ...errors, [name]: errorMsg });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for any existing errors
        const newErrors = {
            email: validateField("email", formData.email),
            student_id: validateField("student_id", formData.student_id),
        };
        setErrors(newErrors);

        if (newErrors.email || newErrors.student_id) return; // prevent submission if errors

        try {
            const response = await sdFormService.addForm(formData);
            alert(
                "Thank you! Your request has been submitted and is awaiting admin review. Your response ID is: " +
                response.id
            );
        } catch (err) {
            alert("There was an error submitting your request. Please try again.");
        }
    };

    const inputClass = (fieldError) =>
        `px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-300 ${fieldError ? "border-red-600" : "border-stone-300"
        }`;

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-2">
                Submit a Server/Database Request
            </h2>
            <p className="text-stone-600 p-2">
                Please fill out the form below to request access to the server or database.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
                {/* Student Name */}
                <div className="flex flex-col">
                    <label htmlFor="full_name" className="text-sm font-medium text-stone-700 mb-1">
                        Student Full Name
                    </label>
                    <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Student Email */}
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-medium text-stone-700 mb-1">
                        Student Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="user@newpaltz.edu"
                        className={inputClass(errors.email)}
                    />
                    {errors.email && <p className="text-red-600 font-medium mt-1">{errors.email}</p>}
                </div>

                {/* Student ID */}
                <div className="flex flex-col">
                    <label htmlFor="student_id" className="text-sm font-medium text-stone-700 mb-1">
                        Student ID (e.g., N07497223)
                    </label>
                    <input
                        type="text"
                        name="student_id"
                        id="student_id"
                        value={formData.student_id}
                        onChange={handleChange}
                        required
                        placeholder="NXXXXXXXX"
                        className={inputClass(errors.student_id)}
                    />
                    {errors.student_id && <p className="text-red-600 font-medium mt-1">{errors.student_id}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Submit Request
                </button>
            </form>
        </div>
    );
}
