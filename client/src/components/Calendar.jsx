import { useState, useMemo, useEffect } from "react";
import PopupWindow from "./PopupWindow";
import facultyService from "../services/facultyService";

export default function Calendar() {
    const [viewDate, setViewDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    // Faculty list state
    const [facultyList, setFacultyList] = useState([]);
    // Popup visibility state
    const [showPopup, setShowPopup] = useState(false);
    // Search bar state
    const [searchQuery, setSearchQuery] = useState("");

    // FAKE EVENTS DATABASE
    const events = {
        "2025-10-03": ["Project kickoff meeting", "Lunch with team"],
        "2025-10-05": ["Webdev workshop", "Code review session"],
        "2025-10-10": ["Team coding session", "Client demo at 4 PM"],
        "2025-10-14": ["Maria’s Birthday", "Send reminders"],
        "2025-10-18": ["Weekend planning"],
        "2025-09-20": ["Hydra website update", "Server backup check"],
        "2024-11-22": ["Presentation draft due"],
        "2025-10-25": ["Hackathon event - all day"],
        "2025-10-28": ["Team meeting - 11 AM"],
        "2025-10-31": [" Halloween Party - 7 PM"],
    };

    // Fetch faculty data for popup
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

    // Filter faculty based on search query
    const filteredFaculty = facultyList.filter(f => {
        const name = f?.name?.toLowerCase() ?? "";
        const officeHours = f?.office_hours?.toLowerCase() ?? "";
        const query = searchQuery?.toLowerCase() ?? "";
        return name.includes(query) || officeHours.includes(query);
    });

    // --- Updated hasOfficeHours function ---
    const hasOfficeHours = (date) => {
        const dayStr = date.toLocaleDateString("en-US", { weekday: "long" });
        return filteredFaculty.some(f => {
            const officeHoursStr = f.office_hours || ""; // string-based office hours
            return officeHoursStr.toLowerCase().includes(dayStr.toLowerCase());
        });
    };

    // Click handler
    const onDateSelect = (date) => {
        setSelectedDate(date);
        setShowPopup(true);
    };

    // Filter events based on search query
    const filteredEvents = Object.keys(events).reduce((acc, dateKey) => {
        const matched = events[dateKey].filter((ev) =>
            ev.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (matched.length) acc[dateKey] = matched;
        return acc;
    }, {});

    // Compute month info
    const { year, month, daysInMonth, startWeekday } = useMemo(() => {
        const y = viewDate.getFullYear();
        const m = viewDate.getMonth();
        const dim = new Date(y, m + 1, 0).getDate();
        const start = new Date(y, m, 1).getDay();
        return { year: y, month: m, daysInMonth: dim, startWeekday: start };
    }, [viewDate]);

    const monthLabel = viewDate.toLocaleString(undefined, {
        month: "long",
        year: "numeric",
    });

    const gotoPrev = () =>
        setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
    const gotoNext = () =>
        setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

    const formatDateKey = (date) => date.toISOString().split("T")[0];

    return (
        <div
            style={{
                width: "100%",
                maxWidth: 800,
                margin: "20px auto",
                fontFamily: "system-ui, sans-serif",
                border: "1px solid #1a1818ff",
                position: "relative",
            }}
        >
            {/* Search Bar */}
            <div style={{ padding: "10px 20px" }}>
                <input
                    type="text"
                    placeholder="Search events or faculty office hours..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: 6,
                        border: "1px solid #ccc",
                        fontSize: 16,
                    }}
                />
            </div>
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 20px",
                    borderBottom: "1px solid #1a1818ff",
                }}
            >
                <button
                    onClick={gotoPrev}
                    onMouseDown={(e) => {
                        e.currentTarget.interval = setInterval(gotoPrev, 150);
                    }}
                    onMouseUp={(e) => clearInterval(e.currentTarget.interval)}
                    onMouseLeave={(e) => clearInterval(e.currentTarget.interval)}
                >
                    &lt;
                </button>

                <h2 style={{ margin: 0 }}>{monthLabel}</h2>

                <button
                    onClick={gotoNext}
                    onMouseDown={(e) => {
                        e.currentTarget.interval = setInterval(gotoNext, 150);
                    }}
                    onMouseUp={(e) => clearInterval(e.currentTarget.interval)}
                    onMouseLeave={(e) => clearInterval(e.currentTarget.interval)}
                >
                    &gt;
                </button>
            </div>

            {/* Weekday headers */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    textAlign: "center",
                    padding: "10px 0",
                    background: "#f9f9f9",
                    fontWeight: 600,
                }}
            >
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <div key={d}>{d}</div>
                ))}
            </div>

            {/* Calendar grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    borderTop: "1px solid #1a1818ff",
                }}
            >
                {/* Blank cells before month start */}
                {Array.from({ length: startWeekday }).map((_, i) => (
                    <div
                        key={"blank" + i}
                        style={{
                            border: "1px solid #919191ff",
                            background: "#d2d2d2ff",
                        }}
                    ></div>
                ))}

                {/* Days */}
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
                                border: "1px solid #1a1818ff",
                                padding: "10px",
                                minHeight: 80,
                                cursor: "pointer",
                                textAlign: "right",
                                fontWeight: 600,
                                color: "#444",
                                background: "white",
                                position: "relative",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#e5e1b1ff")} // light hover
                            onMouseLeave={(e) => (e.currentTarget.style.background = "white")} // back to white
                        >
                            {day}
                            {/* Small event indicator dot */}
                            {hasEvents && (
                                <div
                                    style={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        background: "red",
                                        position: "absolute",
                                        bottom: 6,
                                        left: 6,
                                    }}
                                ></div>
                            )}

                            {/* Blue dot for office hours */}
                            {officeHours && (
                                <div
                                    style={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        background: "blue",
                                        position: "absolute",
                                        bottom: 6,
                                        right: 6,
                                    }}
                                ></div>
                            )}
                        </div>
                    );
                })}

                {/* Fill end blanks */}
                {Array.from({
                    length: 7 - ((startWeekday + daysInMonth) % 7 || 7),
                }).map((_, i) => (
                    <div
                        key={"endblank" + i}
                        style={{
                            border: "1px solid #919191ff",
                            background: "#d2d2d2ff",
                        }}
                    ></div>
                ))}
            </div>

            {/* Popup Window */}
            {showPopup && selectedDate && (
                <PopupWindow
                    date={selectedDate}
                    faculty={filteredFaculty.filter(f => {
                        const dayStr = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
                        const officeHoursStr = f.office_hours || "";
                        return officeHoursStr.toLowerCase().includes(dayStr.toLowerCase());
                    })}
                    events={events[formatDateKey(selectedDate)] || []}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </div>
    );
}
