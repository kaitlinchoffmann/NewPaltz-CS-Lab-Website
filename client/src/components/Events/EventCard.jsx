import React from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

export default function EventCard({ event, onClick }) {

    const handleClick = () => {
        if (onClick) onClick(event);
    };

    // Image fallback
    const flyerSrc = event.flyer_url
        ? `/api${event.flyer_url}`
        : '/api/uploads/noFlyer.jpg';

    const handleImageError = (e) => {
        if (e.target.src !== '/api/uploads/noFlyer.jpg') {
            e.target.src = '/api/uploads/noFlyer.jpg';
        }
    };

    // Color gradients
    const gradients = [
        'from-violet-400 via-purple-400 to-indigo-400',
        'from-rose-400 via-pink-400 to-fuchsia-400',
        'from-cyan-400 via-teal-400 to-emerald-400',
        'from-amber-400 via-orange-400 to-red-400',
        'from-blue-400 via-indigo-400 to-violet-400',
        'from-emerald-400 via-green-400 to-teal-400',
    ];

    // 👉 Auto-generate a color index using event ID or title
    const colorIndex = Math.abs(
        (event.id || event.title || "x")
            .toString()
            .split("")
            .reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
    ) % gradients.length;

    const colorClass = gradients[colorIndex];

    return (
        <div
            onClick={handleClick}
            className="flex-shrink-0 group cursor-pointer"
        >
            {/* Outer gradient shell */}
            <div className={`w-72 h-100 rounded-3xl bg-gradient-to-br ${colorClass} p-1
                shadow-lg transition-all duration-300`}>

                {/* Inner white glossy container */}
                <div className="w-full h-full bg-white/90 backdrop-blur-sm rounded-[22px] p-5 flex flex-col">

                    {/* Tag / Badge */}
                    <div className="flex justify-between items-center mb-3">
                        <span className={`px-3 py-1.5 bg-gradient-to-r ${colorClass} rounded-full text-xs font-bold text-white shadow-md`}>
                            {event.type || "Event"}
                        </span>
                    </div>

                    {/* Flyer */}
                    <div className="w-full h-36 bg-gray-100 rounded-xl mb-3 flex items-center justify-center overflow-hidden">
                        <img
                            src={flyerSrc}
                            onError={handleImageError}
                            alt={event.title}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-gray-900 transition-colors">
                        {event.title}
                    </h3>

                    {/* Time */}
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                        <FaClock className="text-xs opacity-60" />
                        {new Date(event.start_time).toLocaleString()}
                    </div>

                    {/* End Time */}
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                        <FaCalendarAlt className="text-xs opacity-60" />
                        Ends: {new Date(event.end_time).toLocaleString()}
                    </div>

                    {/* Location */}
                    {event.location && (
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <FaMapMarkerAlt className="text-xs opacity-60" />
                            {event.location}
                        </div>
                    )}

                    {/* CTA */}
                    <div className="mt-auto text-center opacity-100 transition-all duration-300">
                        <span className={`text-sm font-semibold bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}>
                            View Event →
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
}
