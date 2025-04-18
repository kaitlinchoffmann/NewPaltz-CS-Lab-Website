import { useState, useEffect } from "react";
import HighlightCard from "../StudentHighlights/StudentCard.jsx";
import SearchBar from "../StudentHighlights/SearchBar.jsx";
import highlightService from "../../services/studentHighlightService";
import { Link } from "react-router-dom";

/**
 * StudentHighlights component displays a paginated grid of student highlights
 * with filtering and search capabilities.
 * 
 * Features:
 * - Category filtering
 * - Search functionality
 * - Pagination
 * - Highlight cards display
 * 
 * @component
 * @returns {JSX.Element} The rendered StudentHighlights component
 */
export default function HighlightsSection() {
    // State management for highlights and UI controls
    const [highlights, setHighlights] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 6; // Number of highlight cards to display per page

    /**
     * Fetches highlights from the API when component mounts
     */
    useEffect(() => {
        const loadHighlights = async () => {
            try {
                setIsLoading(true);
                const data = await highlightService.getAllPosts();
                console.log("Highlights loaded:", data);
                setHighlights(data);
            } catch (err) {
                console.error("Error loading highlights:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadHighlights();
    }, []);

    // Available highlight categories
    const categories = ['all', 'academic', 'sports', 'arts', 'community service', 'research'];

    // Apply category and search filters to highlights
    const filteredHighlights = highlights
        .filter((highlight) =>
            selectedCategory === "all" ? true : highlight.category === selectedCategory
        )
        .filter((highlight) =>
            searchQuery
                ? highlight.title.toLowerCase().includes(searchQuery.toLowerCase())
                : true
        );

    // Calculate pagination indices
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentHighlights = filteredHighlights.slice(indexOfFirstCard, indexOfLastCard);

    /**
     * Handles pagination navigation
     * @param {string} direction - Direction to navigate ("next" or "prev")
     */
    const handlePageChange = (direction) => {
        if (direction === "next" && currentPage < Math.ceil(filteredHighlights.length / cardsPerPage)) {
            setCurrentPage(currentPage + 1);
        } else if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    /**
     * Handles the deletion of a highlight
     * @param {string} highlightId - The ID of the highlight to delete
     */
    const handleDelete = async (highlightId) => {
        if (window.confirm("Are you sure you want to delete this highlight?")) {
            try {
                await highlightService.deleteHighlight(highlightId);
                setHighlights((prevHighlights) =>
                    prevHighlights.filter((highlight) => highlight.id !== highlightId)
                );
                alert("Highlight deleted successfully.");
            } catch (err) {
                console.error("Error deleting highlight:", err);
                alert("Failed to delete highlight. Please try again.");
            }
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <Link to="/create-student-highlight"
                    className="px-4 py-2 bg-yellow-300 rounded-md hover:bg-yellow-400 transition"
                >
                    Add Student Highlight
                </Link>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full sm:w-auto px-4 py-2 border border-stone-300 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white shadow-sm"
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>

                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </div>
            </div>

            {isLoading && (
                <p className="text-stone-600 text-sm mb-6">Loading highlights...</p>
            )}
            {error && <p className="text-red-500 text-sm mb-6">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentHighlights.map((highlight, index) => (
                    <div className="w-full flex flex-col items-center justify-center" key={highlight.id}>
                        <HighlightCard
                            key={highlight.id}
                            studentHighlight={highlight}
                            index={index}
                        />
                        <div className="flex py-1 gap-2">
                            <Link
                                to={`student-highlights/edit/${highlight.id}`}
                                className="px-4 py-2 bg-green-300 rounded-md hover:bg-green-400 transition"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(highlight.id)}
                                className="px-4 py-2 bg-red-300 rounded-md hover:bg-red-400 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => handlePageChange("prev")}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-2 bg-stone-300 rounded enabled:hover:scale-110 transition-all-ease duration-300 disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => handlePageChange("next")}
                    disabled={indexOfLastCard >= filteredHighlights.length}
                    className="px-4 py-2 mx-2 bg-stone-300 enabled:hover:scale-110 transition-all-ease duration-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {!isLoading && filteredHighlights.length === 0 && (
                <p className="text-stone-500 text-center mt-10">No highlights found.</p>
            )}
        </div>
    );
}
