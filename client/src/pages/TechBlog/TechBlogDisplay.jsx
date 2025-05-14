import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TechCard from "../../components/TechBlog/TechCard";
import techBlogService from "../../services/techBlogService";

// Component to display tech blog articles
export default function TechBlogDisplay() {
  // State to store blog posts
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedCategory, setSelectedCategory] = useState('recent posts'); // Selected category
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const cardsPerPage = 6; // Number of articles per page

  // Fetch blog posts when the component mounts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await techBlogService.getAllArticles(); // Fetch articles
        setBlogPosts(data); // Update state with articles
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setIsLoading(false); // Set loading to false
      }
    };

    loadPosts();
  }, []);

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === 'recent posts'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  // Calculate indices for pagination
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstCard, indexOfLastCard);

  // Handle pagination navigation
  const handlePageChange = (direction) => {
    if (direction === "next" && indexOfLastCard < filteredPosts.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Categories for filtering
  const categories = ['recent posts', 'programming', 'web development', 'cybersecurity', 'artificial intelligence', 'Technical Interviews'];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header with category filter and submit button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-4">Tech Articles</h1>

        <Link to="/submit-article">
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

      {/* Loading and error messages */}
      {isLoading && <p>Getting Blog Posts...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display blog posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {currentPosts.map((post, index) => (
          <TechCard key={post.id} post={post} index={index} />
        ))}
      </div>

      {/* Pagination controls */}
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

      {/* Message when no posts are found */}
      {!isLoading && filteredPosts.length === 0 && (
        <p className="text-stone-500 text-center mt-10">No resources found.</p>
      )}
    </div>
  );
}

