import { useState, useEffect } from "react";
import ResourceCard from "../components/StudentResources/ResourceCard";
import SearchBar from "../components/StudentResources/SearchBar";
import resourceService from "../services/resourceService";

/**
 * StudentResources component displays a paginated grid of educational resources
 * with filtering and search capabilities.
 * 
 * Features:
 * - Category filtering
 * - Search functionality
 * - Pagination
 * - Resource cards display
 * 
 * @component
 * @returns {JSX.Element} The rendered StudentResources component
 */
export default function StudentResources() {
  // State management for resources and UI controls
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6; // Number of resource cards to display per page

  /**
   * Fetches resources from the API when component mounts
   */
  useEffect(() => {
    const loadResources = async () => {
      try {
        setIsLoading(true);
        const data = await resourceService.getAllResources();
        console.log("Resources loaded:", data);
        setResources(data);
      } catch (err) {
        console.error("Error loading resources:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadResources();
  }, []);

  // Available resource categories
  const categories = ['all', 'programming', 'web development', 'cybersecurity', 'artificial intelligence', 'Technical Interviews'];

  // Apply category and search filters to resources
  const filteredResources = resources
    .filter((resource) =>
      selectedCategory === "all" ? true : resource.category === selectedCategory
    )
    .filter((resource) =>
      searchQuery
        ? resource.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  // Calculate pagination indices
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentResources = filteredResources.slice(indexOfFirstCard, indexOfLastCard);

  /**
   * Handles pagination navigation
   * @param {string} direction - Direction to navigate ("next" or "prev")
   */
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < Math.ceil(filteredResources.length / cardsPerPage)) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-stone-800">Student Resources</h1>

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
        <p className="text-stone-600 text-sm mb-6">Loading resources...</p>
      )}
      {error && <p className="text-red-500 text-sm mb-6">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentResources.map((resource, index) => (
          <ResourceCard
            key={resource.id}
            studentResource={resource}
            index={index}
          />
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
          disabled={indexOfLastCard >= filteredResources.length}
          className="px-4 py-2 mx-2 bg-stone-300 enabled:hover:scale-110 transition-all-ease duration-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {!isLoading && filteredResources.length === 0 && (
        <p className="text-stone-500 text-center mt-10">No resources found.</p>
      )}
    </div>
  );
}
