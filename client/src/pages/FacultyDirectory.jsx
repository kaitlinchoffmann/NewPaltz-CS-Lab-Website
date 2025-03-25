import { useState, useEffect } from "react";
import FacultyCard from "../components/FacultyDirectory/FacultyCard";
import SearchBar from "../components/FacultyDirectory/SearchBar";
import facultyService from "../services/facultyService";

export default function FacultyDirectory() {
  // State to store faculty
  const [faculty, setFaculty] = useState([]);

  // State to keep track of loading state
  const [isLoading, setIsLoading] = useState(true);

  // State to keep track of any errors
  const [error, setError] = useState(null);

  // State to store search query
  const [searchQuery, setSearchQuery] = useState("");

  // State to keep track of the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Number of faculty cards per page
  const cardsPerPage = 6;

  // When the page loads, get the faculty
  useEffect(() => {
    const loadFaculty = async () => {
      try {
        const data = await facultyService.getAllFaculty();
        setFaculty(data);
      } catch (err) {
        setError(err.message); // Say if something went wrong
      } finally {
        setIsLoading(false); // Say "we're done looking!"
      }
    };

    loadFaculty(); // Call function
  }, []); // Only do this when the page first loads

  // Filter faculty based on search
  const filteredFaculty = searchQuery
    ? faculty.filter(f =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : faculty;

  // Calculate the index of the first and last card on the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  // Get the current faculty cards to display
  const currentFaculty = filteredFaculty.slice(indexOfFirstCard, indexOfLastCard);

  // Function to handle page change
  const handlePageChange = (direction) => {
    if (direction === "next" && indexOfLastCard < filteredFaculty.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl text-stone-800 font-bold mb-4">Faculty Directory</h1>

        {/* Show if we're still getting the faculty */}
        {isLoading && <p>Getting faculty list...</p>}

        {/* Show if something went wrong */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Our search box */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {/* Display faculty cards */}
      <div className="grid md:grid-cols-1 lg:grid-cols-2  gap-4 mt-4">
        {currentFaculty.map((faculty, index) => (
          <FacultyCard key={faculty.id} faculty={faculty} index={index} />
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
          disabled={indexOfLastCard >= filteredFaculty.length}
          className="px-4 py-2 mx-2 bg-stone-300 enabled:hover:scale-110 transition-all-ease duration-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

