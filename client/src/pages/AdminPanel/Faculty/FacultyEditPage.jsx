import { useState, useEffect } from "react";
import facultyService from "../../../services/facultyService";
import { useParams } from "react-router-dom";

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function FacultyEditPage() {
    const { id } = useParams(); // Get the faculty ID from the URL

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        email: "",
        website: "",
        office_hours: {}, // now an object with keys for each day
        phone_number: "",
        office_location: "",
        img: "",
    });

    const [error, setError] = useState({});

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const data = await facultyService.getFacultyByID(id);

                // If office_hours is a string, convert to object per day
                const officeHoursObj = {};
                DAYS_OF_WEEK.forEach(day => { officeHoursObj[day] = ""; });

                if (data.office_hours) {
                    data.office_hours.split(",").forEach(item => {
                        const [day, ...hours] = item.trim().split(" ");
                        officeHoursObj[day] = hours.join(" ");
                    });
                }

                setFormData({ ...data, office_hours: officeHoursObj });
            } catch (err) {
                setError("Failed to load the faculty member.");
                console.error("Error fetching faculty:", err);
            }
        };

        fetchFaculty();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "img") {
            const fileName = files[0] ? files[0].name : "";
            setFormData({ ...formData, img: fileName });
        } else if (DAYS_OF_WEEK.includes(name)) {
            // Office hours per day
            setFormData({
                ...formData,
                office_hours: { ...formData.office_hours, [name]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();

        // Convert office_hours object to string: "Monday 5-9PM, Tuesday 3-4PM"
        const officeHoursString = Object.entries(formData.office_hours)
            .filter(([, hours]) => hours.trim() !== "")
            .map(([day, hours]) => `${day} ${hours}`)
            .join(", ");

        const payload = { ...formData, office_hours: officeHoursString };

        try {
            await facultyService.editFaculty(id, payload);
            alert("Faculty edited successfully!");
            window.location.href = "/admin-panel";
        } catch (err) {
            console.error("Error editing faculty:", err);
            alert(err.message || "Failed to edit faculty. Please try again.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Edit Faculty</h2>
            <p className="text-stone-600 p-2">
                Update the data below for this faculty member. Click "Edit Faculty" to save.
            </p>
            <form onSubmit={handleEdit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
                {/* Name */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-stone-700 mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Role */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-stone-700 mb-1">Role</label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-stone-700 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Office Hours per day */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-stone-700 mb-1">
                        Office Hours (per day, leave empty if none)
                    </label>
                    {DAYS_OF_WEEK.map(day => (
                        <div key={day} className="flex items-center space-x-4">
                            <span className="w-24 font-medium text-stone-700">{day}:</span>
                            <input
                                type="text"
                                name={day}
                                placeholder="e.g. 3-5PM"
                                value={formData.office_hours[day] || ""}
                                onChange={handleChange}
                                className="flex-1 px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
                    ))}
                </div>

                {/* Office Location */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-stone-700 mb-1">Office Location</label>
                    <input
                        type="text"
                        name="office_location"
                        value={formData.office_location}
                        onChange={handleChange}
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-stone-700 mb-1">Phone Number</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Website */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-stone-700 mb-1">Website</label>
                    <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Image Upload */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-stone-700 mb-1">Faculty Headshot</label>
                    <input
                        type="file"
                        name="img"
                        accept="image/*"
                        onChange={handleChange}
                        className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                    />
                    {formData.img && (
                        <p className="text-xs text-stone-600 mt-1">Selected: {formData.img.name || formData.img}</p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-300 text-white rounded-md hover:bg-blue-400 transition font-medium"
                >
                    Edit Faculty
                </button>
            </form>
        </div>
    );
}
