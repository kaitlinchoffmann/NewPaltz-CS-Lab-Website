import { useState, useMemo, useEffect } from "react";
import PopupWindow from "./PopupWindow";
import facultyService from "../services/facultyService";
import eventService from "../services/eventService";

export default function Calendar() {
    const [viewDate, setViewDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const [facultyList, setFacultyList] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [events, setEvents] = useState({});

    // ⭐ Pastel background colors by month
    const monthColors = [
        "#FFE8E8", "#FFF3E0", "#FFF9C5", "#C6FFCB",
        "#B8DCF5", "#DCC8FB", "#FCE4EC", "#FFF2C9",
        "#89BEC5", "#D4F7AC", "#FFFAC4", "#F8CEFF",
    ];

    // Make lighter/darker versions of color
    const shadeColor = (color, percent) => {
        let num = parseInt(color.replace("#", ""), 16),
            amt = Math.round(2.55 * percent),
            r = (num >> 16) + amt,
            g = ((num >> 8) & 0x00FF) + amt,
            b = (num & 0x0000FF) + amt;

        return (
            "#" +
            (
                0x1000000 +
                (r < 255 ? (r < 0 ? 0 : r) : 255) * 0x10000 +
                (g < 255 ? (g < 0 ? 0 : g) : 255) * 0x100 +
                (b < 255 ? (b < 0 ? 0 : b) : 255)
            )
                .toString(16)
                .slice(1)
        );
    };

    // Compute date pieces first
    const { year, month, daysInMonth, startWeekday } = useMemo(() => {
        const y = viewDate.getFullYear();
        const m = viewDate.getMonth();
        const dim = new Date(y, m + 1, 0).getDate();
        const start = new Date(y, m, 1).getDay();
        return { year: y, month: m, daysInMonth: dim, startWeekday: start };
    }, [viewDate]);

    // Now color logic is safe
    const monthColor = monthColors[month];
    const borderColor = shadeColor(monthColor, -25); // darker
    const searchColor = shadeColor(monthColor, +15); // lighter


    // Fetch faculty
    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const data = await facultyService.getAllFaculty();
                setFacultyList(data);
            } catch (err) {
                console.error("Failed to load faculty", err);
            }
        };
        fetchFaculty();
    }, []);

    // Fetch events
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await eventService.getAllEvents();
                const eventsByDate = data.reduce((acc, ev) => {
                    const dateKey = new Date(ev.start_time)
                        .toISOString()
                        .split("T")[0];
                    if (!acc[dateKey]) acc[dateKey] = [];
                    acc[dateKey].push(ev);
                    return acc;
                }, {});
                setEvents(eventsByDate);
            } catch (err) {
                console.error("Failed to load events", err);
            }
        };
        fetchEvents();
    }, []);

    const filteredFaculty = facultyList.filter((f) => {
        const name = f?.name?.toLowerCase() ?? "";
        const officeHours = f?.office_hours?.toLowerCase() ?? "";
        const query = searchQuery?.toLowerCase() ?? "";
        return name.includes(query) || officeHours.includes(query);
    });

    const hasOfficeHours = (date) => {
        const dayStr = date.toLocaleDateString("en-US", { weekday: "long" });
        return filteredFaculty.some((f) => {
            const hours = f.office_hours || "";
            return hours.toLowerCase().includes(dayStr.toLowerCase());
        });
    };

    const onDateSelect = (date) => {
        setSelectedDate(date);
        setShowPopup(true);
    };

    const filteredEvents = Object.keys(events).reduce((acc, dateKey) => {
        const matched = events[dateKey].filter((ev) =>
            ev.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (matched.length) acc[dateKey] = matched;
        return acc;
    }, {});

    const monthLabel = viewDate.toLocaleString(undefined, {
        month: "long",
        year: "numeric",
    });

    const gotoPrev = () =>
        setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));

    const gotoNext = () =>
        setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

    const formatDateKey = (date) => date.toLocaleDateString("en-CA");


    // ---------------------------------------------------------
    // RENDER
    // ---------------------------------------------------------
    return (
        <div
            style={{
                width: "100%",
                maxWidth: 850,
                margin: "30px auto",
                fontFamily: "system-ui, sans-serif",
                background: monthColor,
                borderRadius: 18,
                boxShadow: "0 4px 22px rgba(0,0,0,0.09)",
                overflow: "hidden",
                border: `2px solid ${borderColor}`,
            }}
        >
            {/* Search */}
            <div
                style={{
                    padding: "15px 20px",
                    borderBottom: `1px solid ${borderColor}`,
                    background: searchColor,
                }}
            >
                <input
                    type="text"
                    placeholder="Search events or faculty office hours..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: 10,
                        border: `1px solid ${borderColor}`,
                        fontSize: 16,
                        background: "#ffffffaa",
                        transition: "0.2s",
                    }}
                />
            </div>

            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 20px",
                    background: shadeColor(monthColor, -5),
                    borderBottom: `1px solid ${borderColor}`,
                }}
            >
                <button
                    onClick={gotoPrev}
                    style={{
                        padding: "6px 14px",
                        borderRadius: 8,
                        background: "white",
                        border: `1px solid ${borderColor}`,
                        cursor: "pointer",
                        fontSize: 18,
                    }}
                >
                    ‹
                </button>

                <h2
                    style={{
                        margin: 0,
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#333",
                    }}
                >
                    {monthLabel}
                </h2>

                <button
                    onClick={gotoNext}
                    style={{
                        padding: "6px 14px",
                        borderRadius: 8,
                        background: "white",
                        border: `1px solid ${borderColor}`,
                        cursor: "pointer",
                        fontSize: 18,
                    }}
                >
                    ›
                </button>
            </div>

            {/* Weekdays */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    textAlign: "center",
                    padding: "12px 0",
                    background: shadeColor(monthColor, +10),
                    fontWeight: 600,
                    fontSize: 15,
                    borderBottom: `1px solid ${borderColor}`,
                    color: "#555",
                }}
            >
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <div key={d}>{d}</div>
                ))}
            </div>

            {/* Days Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                }}
            >
                {/* Empty cells start */}
                {Array.from({ length: startWeekday }).map((_, i) => (
                    <div
                        key={"blank" + i}
                        style={{
                            border: `1px solid ${borderColor}`,
                            minHeight: 95,
                            background: monthColor,
                        }}
                    ></div>
                ))}

                {/* Real days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const date = new Date(year, month, day);
                    const dateKey = formatDateKey(date);

                    const hasEvents = !!filteredEvents[dateKey];
                    const officeHours = hasOfficeHours(date);

                    return (
                        <div
                            key={day}
                            onClick={() => onDateSelect(date)}
                            style={{
                                border: `1px solid ${borderColor}`,
                                padding: "10px",
                                minHeight: 95,
                                cursor: "pointer",
                                textAlign: "right",
                                fontWeight: 600,
                                color: "#333",
                                background: monthColor,
                                position: "relative",
                                transition: "0.18s",
                            }}
                        >
                            {day}

                            {/* Event dot */}
                            {hasEvents && (
                                <div
                                    style={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: "50%",
                                        background: "#d32f2f",
                                        position: "absolute",
                                        bottom: 8,
                                        left: 8,
                                    }}
                                ></div>
                            )}

                            {/* Office hours dot */}
                            {officeHours && (
                                <div
                                    style={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: "50%",
                                        background: "#1e88e5",
                                        position: "absolute",
                                        bottom: 8,
                                        right: 8,
                                    }}
                                ></div>
                            )}
                        </div>
                    );
                })}

                {/* Empty end cells */}
                {Array.from({
                    length: 7 - ((startWeekday + daysInMonth) % 7 || 7),
                }).map((_, i) => (
                    <div
                        key={"endblank" + i}
                        style={{
                            border: `1px solid ${borderColor}`,
                            minHeight: 95,
                            background: monthColor,
                        }}
                    ></div>
                ))}
            </div>

            {/* Popup */}
            {showPopup && selectedDate && (
                <PopupWindow
                    date={selectedDate}
                    faculty={filteredFaculty.filter((f) => {
                        const dayStr = selectedDate.toLocaleDateString(
                            "en-US",
                            { weekday: "long" }
                        );
                        return f.office_hours?.toLowerCase().includes(dayStr.toLowerCase());
                    })}
                    events={filteredEvents[formatDateKey(selectedDate)] || []}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </div>
    );
}
