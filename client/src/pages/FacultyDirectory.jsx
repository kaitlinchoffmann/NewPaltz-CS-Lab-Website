import { useState, useEffect } from "react";
import FacultyCard from "../components/FacultyDirectory/FacultyCard";
import SearchBar from "../components/FacultyDirectory/SearchBar";
import facultyService from "../services/facultyService";

export default function FacultyDirectory() {

  // State to store faculty
  const [faculty, setFaculty] = useState([]);

  //state to keep track of loading state
  const [isLoading, setIsLoading] = useState(true);

  //state to keep track of any errors
  const [error, setError] = useState(null);

  // State to store search query
  const [searchQuery, setSearchQuery] = useState("");

  //when the page loads, get the faculty
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

    loadFaculty(); //call function

  }, []); //only do this when the page first loads

  // Filter faculty based on search
  const filteredFaculty = searchQuery
    ? faculty.filter(f =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : faculty;


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Faculty Directory</h1>

      {/* Show if we're still getting teh faculty */}
      {isLoading && <p>Getting faculty list...</p>}

      {/* Show if something went wrong */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Our search box */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Display faculty cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {filteredFaculty.map((faculty) => (
          <FacultyCard key={faculty.id} faculty={faculty} />
        ))}
      </div>
    </div>
  );
}

