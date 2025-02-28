
import { useState } from "react";
import FacultyCard from "../components/FacultyDirectory/FacultyCard";
import SearchBar from "../components/FacultyDirectory/SearchBar";
import facultyData from "../components/FacultyDirectory/FacultyData";

export default function FacultyDirectory() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaculty = searchQuery
    ? facultyData.filter(faculty =>
        faculty.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : facultyData;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Faculty Directory</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {filteredFaculty.map((faculty) => (
          <FacultyCard key={faculty.id} faculty={faculty} />
        ))}
      </div>
    </div>
  );
}

