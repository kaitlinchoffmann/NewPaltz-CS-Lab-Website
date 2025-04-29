import { useState, useEffect } from "react";
import studentHighlightService from "../../services/studentHighlightService";
import StudentCard from "../StudentHighlights/StudentCard";
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
  const cardsPerPage = 4; // Number of Highlights cards to display per page

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

  const filteredHighlights = selectedCategory === 'recent posts'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

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

    // Handle deleting a highlight
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this Highlight?")) {
            if (!id) {
                console.error("Highlight ID is undefined");
                return;
            }
            try {
                await studentHighlightService.deletePost(id);
                // Optionally, update the state to remove the deleted FAQ
                setBlogPosts((prevblogPosts) => prevblogPosts.filter((f) => f.id !== id));
            } catch (error) {
                console.error(`Error deleting highlight with id: ${id}`, error);
            }
     }
    };
    
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
      <Link to = "/create-student-highlight"
                    className = "px-4 py-2 bg-yellow-300 rounded-md hover:bg-yellow-400 transition"
                >
                    Add Student Highlight
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
      <div className="w-full flex-col gap-4 flex items-center justify-center"> 
        {currentHighlights.map((highlight, index) => (
            <div className="w-full flex flex-col items-center justify-center" key={highlight.id}>
                <StudentCard key={highlight.id} post={highlight} index={index} />
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
                    <Link
                        to={`/student-highlights/${highlight.id}`}
                        className="px-4 py-2 bg-blue-300 rounded-md hover:bg-blue-400 transition"
                    >
                        Preview
                    </Link>
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
          disabled={currentPage >= Math.ceil(filteredHighlights.length / cardsPerPage)}
          className="px-4 py-2 mx-2 bg-stone-300 enabled:hover:scale-110 transition-all-ease duration-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {!isLoading && filteredHighlights.length === 0 && (
        <p className="text-stone-500 text-center mt-10">No Highlights found.</p>
      )}
    </div>
  );
}