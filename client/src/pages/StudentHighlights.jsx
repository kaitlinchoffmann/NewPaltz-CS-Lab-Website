import { useState, useEffect } from "react";
import StudentCard from "../components/StudentHighlights/studentCard";
import studentHighlightService from "../services/studentHighlightService";
import { Link } from "react-router-dom";

export default function StudentHighlights() {

  // State to store blog posts
  const [blogPosts, setBlogPosts] = useState([]);

  //state to keep track of loading state
  const [isLoading, setIsLoading] = useState(true);

  //state to keep track of any errors
  const [error, setError] = useState(null);

  //state to keep track of selected category
  const [selectedCategory, setSelectedCategory] = useState('recent posts');

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4; // Number of resource cards to display per page

  //when the page loads, get the blog posts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await studentHighlightService.getAllPosts();
        setBlogPosts(data);
      } catch (err) {
        setError(err.message); // Say if something went wrong
      } finally {
        setIsLoading(false); // Say "we're done looking!"
      }
    };

    loadPosts(); //call function

  }, []); //only do this when the page first loads


  //make this a table in database
  const categories = ['recent posts', 'programming', 'web development', 'cybersecurity', 'artificial intelligence', 'Technical Interviews'];

  const filteredResources = selectedCategory === 'recent posts'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

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
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-4">Student Projects </h1>
        <Link to = "/submit-project">
          <button className="bg-orange-300 hover:bg-orange-400 hover:shadow-lg hover:scale-105 transition-all ease-in-out duration-300 p-2 rounded-lg">Submit A Project</button>
       </Link>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-md"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        {/* Show if we're still getting Posts */}
        {isLoading && <p>Getting Posts...</p>}

        {error && <p className="text-red-500">{error}</p>}

      </div>

      {/* Display Student Project Posts */}
      <div className=" group flex flex-wrap gap-4 justify-center">

        {currentResources.map((post, index) => (
          <StudentCard key={post.id} post={post} index={index} />
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
          disabled={currentPage >= Math.ceil(filteredResources.length / cardsPerPage)}
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