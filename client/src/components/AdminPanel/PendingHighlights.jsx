import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import studentHighlightService from "../../services/studentHighlightService";
import StudentCard from "../../components/StudentHighlights/StudentCard"; // Component to display individual student highlights

export default function PendingHighlights() {
    // State to manage loading status
    const [isLoading, setIsLoading] = useState(true);
    // State to manage error messages
    const [error, setError] = useState(null);
    // State to store the list of pending posts
    const [pendingPosts, setPendingPosts] = useState([]);

    // Fetch pending posts when the component is mounted
    useEffect(() => {
        const loadPosts = async () => {
            try {
                // Fetch pending posts from the service
                const data = await studentHighlightService.getPendingPosts();
                setPendingPosts(data); // Update state with fetched data
            } catch (err) {
                setError(err.message); // Handle errors by setting the error state
            } finally {
                setIsLoading(false); // Indicate that loading is complete
            }
        };

        loadPosts(); // Call the function to load posts
    }, []); // Dependency array ensures this runs only once on component mount

    // Function to approve a highlight post
    const handleApproveHighlight = async (postId) => {
        if (window.confirm("Are you sure you want to approve this Highlight?")) {
            try {
                // Approve the post using the service
                await studentHighlightService.approvePost(postId);

                // Remove the approved post from the list of pending posts
                setPendingPosts((prev) => prev.filter((post) => post.id !== postId));
            } catch (error) {
                console.error("Error approving post:", error); // Log any errors
            }
        }
    };

    // Function to delete a highlight post
    const handleDeleteHighlight = async (postId) => {
        if (window.confirm("Are you sure you want to delete this Highlight?")) {
            try {
                // Delete the post using the service
                await studentHighlightService.deletePost(postId);

                // Remove the deleted post from the list of pending posts
                setPendingPosts((prev) => prev.filter((post) => post.id !== postId));
            } catch (error) {
                console.error("Error deleting post:", error); // Log any errors
            }
        }
    };

    return (
        <div className="">
            <div className="w-full flex-col gap-4 flex items-center justify-center">
                {/* Render each pending post */}
                {pendingPosts.map((post, index) => (
                    <div className="w-full flex flex-col items-center justify-center" key={post.id}>
                        {/* Display the post using the StudentCard component */}
                        <StudentCard post={post} index={index} />
                        <div className="flex py-1 gap-2">
                            {/* Button to approve the post */}
                            <button
                                onClick={() => handleApproveHighlight(post.id)}
                                className="px-4 py-2 bg-green-300 rounded-md hover:bg-green-400 transition"
                            >
                                Approve
                            </button>
                            {/* Button to delete the post */}
                            <button
                                onClick={() => handleDeleteHighlight(post.id)}
                                className="px-4 py-2 bg-red-300 rounded-md hover:bg-red-400 transition"
                            >
                                Delete
                            </button>
                            {/* Link to edit the post */}
                            <Link
                                to={`/admin-panel/student-highlights/edit/${post.id}`}
                                className="px-4 py-2 bg-orange-300 rounded-md hover:bg-orange-400 transition"
                            >
                                Edit
                            </Link>
                            {/* Link to preview the post */}
                            <Link
                                to={`/student-highlights/${post.id}`}
                                className="px-4 py-2 bg-blue-300 rounded-md hover:bg-blue-400 transition"
                            >
                                Preview
                            </Link>
                        </div>
                    </div>
                ))}

                {/* Display loading message while fetching posts */}
                {isLoading && <p>Getting Posts...</p>}
                {/* Display error message if an error occurs */}
                {error && <p className="text-red-500">{error}</p>}
                {/* Display message if no pending posts are available */}
                {pendingPosts.length === 0 && !isLoading && (
                    <p className="text-blue-300 text-lg">No Pending Student Highlight Requests</p>
                )}
            </div>
        </div>
    );
}