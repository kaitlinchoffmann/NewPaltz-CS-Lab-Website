import React from "react";

export default function PopupWindow({ date, events, faculty, onClose }) {
    return (
        <div
            className="
                fixed inset-0 bg-black/50 backdrop-blur-md
                flex items-center justify-center z-[2000]
                p-4 animate-fadeIn
            "
            onClick={onClose}
        >
            <div
                className="
        relative w-full max-w-2xl
        bg-white/80 backdrop-blur-2xl
        rounded-3xl shadow-2xl border border-white/30
        p-6 
        max-h-[85vh] overflow-y-auto popup-scroll
        animate-slideUp
        scrollbar-gutter-stable
    "
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="
                        absolute top-4 right-4 w-10 h-10 rounded-full
                        bg-white/90 border border-gray-300 shadow-md
                        flex items-center justify-center
                        text-gray-700 text-lg
                        hover:bg-gray-100 hover:scale-110 transition-all
                    "
                >
                    ✕
                </button>

                {/* Header */}
                <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
                    Events for {date.toDateString()}
                </h2>

                {/* Events */}
                {events.length > 0 ? (
                    <div className="space-y-6">
                        {events.map((ev, i) => {
                            const flyerSrc = ev.flyer
                                ? `/api${ev.flyer}`
                                : "/api/uploads/noFlyer.jpg";

                            return (
                                <div
                                    key={i}
                                    className="
                                        p-4 rounded-2xl border border-gray-200
                                        bg-white/60 shadow-sm
                                        hover:shadow-md transition-all
                                    "
                                >
                                    <h3 className="font-semibold text-lg text-gray-800 mb-1">
                                        {ev.title}
                                    </h3>

                                    <p className="text-sm text-gray-600">
                                        📅{" "}
                                        {new Date(ev.start_time).toLocaleString()}{" "}
                                        – {new Date(ev.end_time).toLocaleString()}
                                    </p>

                                    {ev.location && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            📍 {ev.location}
                                        </p>
                                    )}

                                    {/* Flyer */}
                                    <img
                                        src={flyerSrc}
                                        alt={ev.title}
                                        onError={(e) =>
                                        (e.target.src =
                                            "/api/uploads/noFlyer.jpg")
                                        }
                                        className="
                                            w-full mt-3 rounded-xl
                                            border border-gray-200 shadow 
                                            object-contain bg-white
                                        "
                                    />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-gray-700">No events for this day.</p>
                )}

                {/* Faculty Office Hours */}
                <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3 border-b border-gray-300 pb-1">
                    Faculty Office Hours
                </h2>

                {faculty.length > 0 ? (
                    <ul className="space-y-3">
                        {faculty.map((f, i) => (
                            <li
                                key={i}
                                className="
                                    p-3 rounded-xl bg-white/60
                                    border border-gray-200 shadow-sm
                                    hover:bg-white/80 transition-all
                                "
                            >
                                <strong className="text-gray-800">{f.name}:</strong>{" "}
                                <span className="text-gray-700">{f.office_hours}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-700">No matching faculty office hours.</p>
                )}
            </div>
        </div>
    );
}
