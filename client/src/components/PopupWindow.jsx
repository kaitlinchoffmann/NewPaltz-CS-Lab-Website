export default function PopupWindow({ date, events, faculty, onClose }) {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: "white",
                    padding: "30px 40px",
                    borderRadius: "16px",
                    minWidth: 400,
                    maxWidth: 600,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                    position: "relative",
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        border: "none",
                        background: "#f2f2f2",
                        borderRadius: "50%",
                        width: 30,
                        height: 30,
                        fontSize: 18,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#e0e0e0")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#f2f2f2")}
                >
                    ✕
                </button>

                {/* Events section */}
                <h3
                    style={{
                        fontSize: 20,
                        marginBottom: 10,
                        color: "#333",
                        borderBottom: "1px solid #ccc",
                        paddingBottom: 5,
                    }}
                >
                    Events for {date.toDateString()}
                </h3>

                {events.length > 0 ? (
                    <ul style={{ paddingLeft: 20, lineHeight: 1.6 }}>
                        {events.map((ev, i) => (
                            <li
                                key={i}
                                style={{
                                    marginBottom: 6,
                                    padding: "4px 0",
                                    borderRadius: 4,
                                    transition: "background 0.2s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "#f9f9f9")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                            >
                                {ev}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No events for this day.</p>
                )}

                {/* Faculty office hours section */}
                <h3
                    style={{
                        fontSize: 18,
                        margin: "20px 0 10px",
                        color: "#2c3e50",
                        borderBottom: "1px solid #ccc",
                        paddingBottom: 5,
                    }}
                >
                    Faculty Office Hours
                </h3>

                {faculty.length > 0 ? (
                    <ul style={{ paddingLeft: 20, lineHeight: 1.6 }}>
                        {faculty.map((f, i) => (
                            <li
                                key={i}
                                style={{
                                    marginBottom: 6,
                                    padding: "4px 0",
                                    borderRadius: 4,
                                    transition: "background 0.2s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "#f9f9f9")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                            >
                                <strong>{f.name}:</strong> {f.office_hours}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No matching faculty office hours.</p>
                )}
            </div>
        </div>
    );
}
