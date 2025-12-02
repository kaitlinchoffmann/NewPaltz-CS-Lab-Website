import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "../Events/EventCard";
import eventService from "../../services/eventService";
import SearchBar from "../FacultyDirectory/SearchBar"; // Reuse your SearchBar component

export default function EventsSection() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const cardsPerPage = 6;

    // Load events on mount
    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await eventService.getAllEvents();
                setEvents(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadEvents();
    }, []);

    // Filter events by title
    const filteredEvents = searchQuery
        ? events.filter((e) =>
            e.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : events;

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstCard, indexOfLastCard);

    const handlePageChange = (direction) => {
        if (direction === "next" && indexOfLastCard < filteredEvents.length) {
            setCurrentPage(currentPage + 1);
        } else if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            if (!id) return console.error("Event ID is undefined");
            try {
                await eventService.deleteEvent(id);
                setEvents((prev) => prev.filter((e) => e.id !== id));
            } catch (err) {
                console.error(`Error deleting event with id ${id}:`, err);
            }
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex justify-between mb-6">
                <Link
                    to="/create-event"
                    className="px-4 py-2 bg-yellow-300 rounded-md hover:bg-yellow-400 transition"
                >
                    Add Event
                </Link>

                {isLoading && <p>Loading events...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>

            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                {currentEvents.map((event) => (
                    <div
                        key={event.id}
                        className="w-full flex flex-col items-center justify-center"
                    >
                        <EventCard event={event} />

                        <div className="flex py-1 gap-2">
                            <Link
                                to={`/admin-panel/events/edit/${event.id}`}
                                className="px-4 py-2 bg-green-300 rounded-md hover:bg-green-400 transition"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(event.id)}
                                className="px-4 py-2 bg-red-300 rounded-md hover:bg-red-400 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => handlePageChange("prev")}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-2 bg-stone-300 rounded enabled:hover:scale-110 transition-all duration-300 disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => handlePageChange("next")}
                    disabled={indexOfLastCard >= filteredEvents.length}
                    className="px-4 py-2 mx-2 bg-stone-300 enabled:hover:scale-110 transition-all duration-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {!isLoading && filteredEvents.length === 0 && (
                <p className="text-stone-500 text-center mt-10">No events found.</p>
            )}
        </div>
    );
}
