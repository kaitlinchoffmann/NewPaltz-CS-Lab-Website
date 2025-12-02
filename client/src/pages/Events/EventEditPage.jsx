import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import eventService from "../../services/eventService";
import { AuthContext } from "../../context/authContext";

export default function EventEditPage() {
    const { id } = useParams();
    const { user } = useContext(AuthContext); // logged-in user
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        start_time: "",
        end_time: "",
        location: "",
        flyer: null,
        admin_id: null,
    });

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await eventService.getEventById(id);
                // Only allow club role to edit their own events
                if (user.role === "club" && data.admin_id !== user.id) {
                    alert("You can only edit your own events.");
                    window.location.href = "/admin-panel/events";
                    return;
                }
                setFormData(data);
            } catch (err) {
                console.error("Error fetching event:", err);
                alert("Failed to load event. Please try again.");
            }
        };
        fetchEvent();
    }, [id, user]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting:", formData);

        try {
            const data = new FormData();

            // Always send text fields
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("start_time", formData.start_time);
            data.append("end_time", formData.end_time);
            data.append("location", formData.location);

            // Only send flyer if user selected a new one
            if (formData.flyer instanceof File) {
                data.append("flyer", formData.flyer);
            }

            await eventService.editEvent(id, data);

            alert("Event updated successfully!");
            window.location.href = "/admin-panel/events";

        } catch (err) {
            console.error("Error updating event:", err);
            alert("Failed to update event. Please try again.");
        }
    };


    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Edit Event</h2>
            <p className="text-stone-600 p-2">Edit the event details below. Click "Save Changes" to update.</p>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
                {/* Same inputs as EventAddPage.jsx */}
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-sm font-medium text-stone-700 mb-1">Event Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="description" className="text-sm font-medium text-stone-700 mb-1">Event Description</label>
                    <textarea
                        name="description"
                        id="description"
                        rows={6}
                        value={formData.description}
                        onChange={handleChange}
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300 resize-none"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="start_time" className="text-sm font-medium text-stone-700 mb-1">Start Time</label>
                    <input
                        type="datetime-local"
                        name="start_time"
                        id="start_time"
                        value={formData.start_time}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="end_time" className="text-sm font-medium text-stone-700 mb-1">End Time</label>
                    <input
                        type="datetime-local"
                        name="end_time"
                        id="end_time"
                        value={formData.end_time}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="location" className="text-sm font-medium text-stone-700 mb-1">Location</label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="flyer" className="text-sm font-medium text-stone-700 mb-1">Event Flyer</label>
                    <input
                        type="file"
                        name="flyer"
                        id="flyer"
                        accept="image/*"
                        onChange={handleChange}
                        className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                    />
                    {formData.flyer && <p className="text-xs text-stone-600 mt-1">Selected: {formData.flyer.name}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-300 text-white rounded-md hover:bg-blue-400 transition font-medium"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}
