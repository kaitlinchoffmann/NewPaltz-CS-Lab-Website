import { useState, useEffect } from "react";
import FacultyCard from "../FacultyDirectory/FacultyCard";
import SearchBar from "../FacultyDirectory/SearchBar";
import facultyService from "../../services/facultyService";


export default function FacultySection() {
   
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

    // Handle deleting a faculty
    const handleDelete = async (id) => {
    if (!id) {
        console.error("Faculty ID is undefined");
        return;
    }
    try {
        await facultyService.deleteFaculty(id);
        console.log(`Deleted Faculty with ID: ${id}`);
        // Optionally, update the state to remove the deleted Faculty
        setFaculty((prevFaculty) => prevFaculty.filter((f) => f.id !== id));
    } catch (error) {
        console.error(`Error deleting Faculty with id: ${id}`, error);
    }
    };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between mb-6">
        <button 
            className = "px-4 py-2 bg-yellow-300 rounded-md hover:bg-yellow-400 transition"
            onClick={() => handleAdd()}
        >
            Add Faculty Member
        </button>

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
            <div className="w-full flex flex-col items-center justify-center" key={faculty.id}>
                <FacultyCard key={faculty.id} faculty={faculty} index={index} />
                <div className="flex py-1 gap-2">
                    <button
                        className="px-4 py-2 bg-green-300 rounded-md hover:bg-green-400 transition"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(faculty.id)} 
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
          disabled={indexOfLastCard >= filteredFaculty.length}
          className="px-4 py-2 mx-2 bg-stone-300 enabled:hover:scale-110 transition-all-ease duration-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {!isLoading && filteredFaculty.length === 0 && (
        <p className="text-stone-500 text-center mt-10">No resources found.</p>
      )}
    </div>
  );
}