import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import studentHighlightService from "../../services/studentHighlightService";
import StudentCard from "../../components/StudentHighlights/StudentCard"; // Corrected path

export default function PendingHighlights() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pendingPosts, setPendingPosts] = useState([]);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await studentHighlightService.getPendingPosts();
                console.log("Pending posts:", data);
                setPendingPosts(data);
            } catch (err) {
                setError(err.message); // Say if something went wrong
            } finally {
                setIsLoading(false); // Say "we're done looking!"
            }
        };

        loadPosts(); // Call function
    }, []); // Only do this when the page first loads

    // Approve a post
    const handleApproveHighlight = async (postId) => {
        try {
            await studentHighlightService.approvePost(postId);
            console.log(`Approved post with ID: ${postId}`);

            setPendingPosts((prev) => prev.filter((post) => post.id !== postId)); // Remove the approved post from the list
        } catch (error) {
            console.error("Error approving post:", error);
        }
    };

    // Handle deleting a post
    const handleDeleteHighlight = async (postId) => {
        try {
            await studentHighlightService.deletePost(postId);
            console.log(`Deleted post with ID: ${postId}`);

            setPendingPosts((prev) => prev.filter((post) => post.id !== postId)); // Remove the approved post from the list
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div className="">
            <div className="w-full flex-col gap-4 flex items-center justify-center">
                {pendingPosts.map((post, index) => (
                    <div className="w-full flex flex-col items-center justify-center" key={post.id}>
                        <StudentCard post={post} index={index} />
                        <div className="flex py-1 gap-2">
                            <button
                                onClick={() => handleApproveHighlight(post.id)}
                                className="px-4 py-2 bg-green-300 rounded-md hover:bg-green-400 transition"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleDeleteHighlight(post.id)}
                                className="px-4 py-2 bg-red-300 rounded-md hover:bg-red-400 transition"
                            >
                                Delete
                            </button>
                            <Link
                                to={`/student-highlights/edit/${post.id}`}
                                onClick={() => console.log(`Editing post with ID: ${post.id}`)}
                                className="px-4 py-2 bg-orange-300 rounded-md hover:bg-orange-400 transition"
                            >
                                Edit
                            </Link>
                            <Link
                                to={`/student-highlights/${post.id}`}
                                onClick={() => console.log(`Previewing post with ID: ${post.id}`)}
                                className="px-4 py-2 bg-blue-300 rounded-md hover:bg-blue-400 transition"
                            >
                                Preview
                            </Link>
                        </div>
                    </div>
                ))}

                {/* Show if we're still getting Posts */}
                {isLoading && <p>Getting Posts...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {pendingPosts.length === 0 && !isLoading && (
                    <p className="text-blue-300 text-lg">No Pending Student Highlight Requests</p>
                )}
            </div>
        </div>
    );
}