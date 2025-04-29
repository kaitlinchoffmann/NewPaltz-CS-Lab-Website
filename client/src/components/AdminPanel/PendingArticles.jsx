import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import techBlogService from "../../services/techBlogService";
import TechBlogCard from "../../components/TechBlog/TechCard";

export default function PendingArticles() {
    // State for tech articles, loading, and error
    const [pendingArticles, setPendingArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Approve a post
    const handleApproveArticle = async (postId) => {
        if (window.confirm("Are you sure you want to delete this Article?")) {
            try {
                await techBlogService.approveArticle(postId);
                setPendingArticles((prev) => prev.filter((post) => post.id !== postId)); // Remove the approved post from the list
            } catch (error) {
                console.error("Error approving Article:", error);
            }
        }
    };

    // Handle deleting a post
    const handleDeleteArticle = async (postId) => {
        if (window.confirm("Are you sure you want to Delete this Article?")) {
            try {
                await techBlogService.deleteArticle(postId);
                setPendingArticles((prev) => prev.filter((post) => post.id !== postId)); // Remove the deleted post from the list
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }
    };

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const data = await techBlogService.getPendingArticles();
                setPendingArticles(data);
            } catch (err) {
                setError(err.message); // Handle errors
            } finally {
                setIsLoading(false); // Mark loading as complete
            }
        };

        loadArticles(); // Call function
    }, []); // Only do this when the page first loads

    return (
        <div className="">
            <div className="w-full grid grid-cols-2 gap-4 items-center justify-center">
                {pendingArticles.map((article, index) => (
                    <div key={article.id} className="w-full flex flex-col items-center justify-center">
                        <div className="w-5/6">
                            <TechBlogCard post={article} index={index} />
                        </div>

                        {/* Buttons for Approve, Delete, and Edit */}
                        <div className="flex py-1 gap-2">
                            <button
                                onClick={() => handleApproveArticle(article.id)}
                                className="px-4 py-2 bg-green-300 rounded-md hover:bg-green-400 transition"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleDeleteArticle(article.id)}
                                className="px-4 py-2 bg-red-300 rounded-md hover:bg-red-400 transition"
                            >
                                Delete
                            </button>
                            <Link
                                to={`admin-panel/tech-blog/edit/${article.id}`}
                                className="px-4 py-2 bg-orange-300 rounded-md hover:bg-orange-400 transition"
                            >
                                Edit
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show if we're still getting Posts */}
            {isLoading && <p>Getting Posts...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {pendingArticles.length === 0 && !isLoading && (
                <p className="text-blue-300 flex justify-center text-lg">No Pending Tech Articles Requests</p>
            )}
        </div>
    );
}