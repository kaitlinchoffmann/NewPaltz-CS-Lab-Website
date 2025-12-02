import React from "react";
import { FaTimes, FaClock, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

export default function EventPopup({ event, onClose }) {
    if (!event) return null;

    const flyerSrc = event.flyer
        ? `/api${event.flyer}`
        : "/api/uploads/noFlyer.jpg";

    const handleImageError = (e) => {
        if (e.target.src !== "/api/uploads/noFlyer.jpg") {
            e.target.src = "/api/uploads/noFlyer.jpg";
        }
    };

    return (
        <div
            className="
                fixed inset-0 bg-black/50 backdrop-blur-md 
                flex items-center justify-center z-[2000]
                animate-fadeIn
            "
            onClick={onClose}
        >
            <div
                className="
                    relative w-full max-w-2xl mx-4
                    bg-white/80 backdrop-blur-2xl
                    rounded-3xl shadow-2xl
                    border border-white/30
                    p-8 max-h-[90vh] overflow-y-auto
                    animate-slideUp
                "
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="
                        absolute top-5 right-5 w-10 h-10 rounded-full
                        bg-white/90 backdrop-blur-md
                        border border-gray-200 shadow-md
                        flex items-center justify-center
                        hover:bg-gray-100 hover:scale-110
                        transition-all duration-200
                    "
                >
                    <FaTimes className="text-gray-600 text-lg" />
                </button>

                {/* Title */}
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                    {event.title}
                </h2>

                {/* Date & Time block */}
                <div className="space-y-2 mb-6 text-gray-700">
                    <div className="flex items-center gap-3">
                        <FaCalendarAlt className="text-gray-500" />
                        <span className="text-sm">
                            {new Date(event.start_time).toLocaleDateString()}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <FaClock className="text-gray-500" />
                        <span className="text-sm">
                            {new Date(event.start_time).toLocaleTimeString()} –{" "}
                            {new Date(event.end_time).toLocaleTimeString()}
                        </span>
                    </div>

                    {event.location && (
                        <div className="flex items-center gap-3">
                            <FaMapMarkerAlt className="text-gray-500" />
                            <span className="text-sm">{event.location}</span>
                        </div>
                    )}
                </div>

                {/* Description */}
                {event.description && (
                    <p className="text-gray-800 leading-relaxed mb-6 text-[15px] whitespace-pre-line">
                        {event.description}
                    </p>
                )}

                {/* Flyer */}
                <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                    <img
                        src={flyerSrc}
                        onError={handleImageError}
                        alt={event.title}
                        className="w-full object-contain bg-white"
                    />
                </div>
            </div>
        </div>
    );
}
