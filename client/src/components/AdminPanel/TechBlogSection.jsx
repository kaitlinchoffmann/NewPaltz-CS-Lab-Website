import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import techBlogService from "../../services/techBlogService";
import TechBlogCard from "../../components/TechBlog/TechCard";

export default function TechBlogSection() {
    // State for tech articles, loading, and error
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // State to keep track of selected category
    const [selectedCategory, setSelectedCategory] = useState('recent posts');

    // State to keep track of the current page
    const [currentPage, setCurrentPage] = useState(1);

    // Number of resource cards to display per page
    const cardsPerPage = 6;

    // Handle deleting a post
    const handleDeleteArticle = async (postId) => {
        if (window.confirm("Are you sure you want to Delete this Article?")) {
            try {
                await techBlogService.deleteArticle(postId);
                setArticles((prev) => prev.filter((post) => post.id !== postId)); // Remove the deleted post from the list
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }
    };

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const data = await techBlogService.getAllArticles();
                setArticles(data);
            } catch (err) {
                setError(err.message); // Handle errors
            } finally {
                setIsLoading(false); // Mark loading as complete
            }
        };

        loadArticles(); // Call function
    }, []); // Only do this when the page first loads

    // Filter posts based on selected category - doesnt work right now
    const filteredPosts = selectedCategory === 'recent posts'
        ? articles
        : articles.filter(article => article.category === selectedCategory);

    // Calculate pagination indices
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentArticles = filteredPosts.slice(indexOfFirstCard, indexOfLastCard);

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
                <Link to = "/create-tech-blog"
                    className = "px-4 py-2 bg-yellow-300 rounded-md hover:bg-yellow-400 transition"
                >
                    Add Technology Blog
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
    
            <div className="">
                <div className="w-full grid grid-cols-2 gap-4 items-center justify-center">
                    {currentArticles.map((article, index) => (
                        <div key={article.id} className="w-full flex flex-col items-center justify-center">
                            <div className="w-full">
                                <TechBlogCard post={article} index={index} />
                            </div>
                            <div className="flex py-1 gap-2">
                                <Link
                                    to={`/admin-panel/tech-blog/edit/${article.id}`}
                                    className="px-4 py-2 bg-green-300 rounded-md hover:bg-green-400 transition"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDeleteArticle(article.id)}
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
                    disabled={currentPage >= Math.ceil(filteredPosts.length / cardsPerPage)}
                    className="px-4 py-2 mx-2 bg-stone-300 enabled:hover:scale-110 transition-all-ease duration-300 rounded disabled:opacity-50"
                    >
                    Next
                    </button>
                </div>

                {/* Show if we're still getting Posts */}
                {isLoading && <p>Getting Posts...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {articles.length === 0 && !isLoading && (
                    <p className="text-blue-300 flex justify-center text-lg">No Articles Available</p>
                )}
            </div>
        </div>
    );
}