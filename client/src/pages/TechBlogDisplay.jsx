import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TechCard from "../components/TechBlog/TechCard";
import techBlogService from "../services/techBlogService";

export default function TechBlogDisplay() {
  // State to store blog posts
  const [blogPosts, setBlogPosts] = useState([]);

  // State to keep track of loading state
  const [isLoading, setIsLoading] = useState(true);

  // State to keep track of any errors
  const [error, setError] = useState(null);

  // State to keep track of selected category
  const [selectedCategory, setSelectedCategory] = useState('recent posts');

  // State to keep track of the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Number of resource cards to display per page
  const cardsPerPage = 6;

  // Fetch blog posts when the page loads
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await techBlogService.getAllPosts();
        setBlogPosts(data);
      } catch (err) {
        setError(err.message); // Say if something went wrong
      } finally {
        setIsLoading(false); // Say "we're done looking!"
      }
    };

    loadPosts(); // Call function
  }, []); // Only do this when the page first loads

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === 'recent posts'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  // Calculate pagination indices
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstCard, indexOfLastCard);

  // Function to handle page change
  const handlePageChange = (direction) => {
    if (direction === "next" && indexOfLastCard < filteredPosts.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Categories for filtering 
  // TODO: make this a table 
  const categories = ['recent posts', 'programming', 'web development', 'cybersecurity', 'artificial intelligence', 'Technical Interviews'];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-4">Tech Articles</h1>
        
        <Link to = "/submit-article">
          <button className="bg-orange-300 hover:bg-orange-400 hover:shadow-lg hover:scale-105 transition-all ease-in-out duration-300 p-2 rounded-lg">Submit Article</button>
        </Link>

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1); // Reset to first page when category changes
          }}
          className="p-2 border rounded-md"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Show if we're still getting Posts */}
      {isLoading && <p>Getting Blog Posts...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {currentPosts.map((post, index) => (
          <TechCard key={post.id} post={post} index={index} />
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
          disabled={currentPage >= Math.ceil(filteredPosts.length / cardsPerPage)}
          className="px-4 py-2 mx-2 bg-stone-300 enabled:hover:scale-110 transition-all-ease duration-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {!isLoading && filteredPosts.length === 0 && (
        <p className="text-stone-500 text-center mt-10">No resources found.</p>
      )}
    </div>
  );
}

