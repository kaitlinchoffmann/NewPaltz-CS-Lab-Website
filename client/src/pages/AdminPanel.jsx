import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import studentHighlightService from "../services/studentHighlightService";
import techBlogService from "../services/techBlogService";
import StudentCard from "../components/StudentHighlights/studentCard";
import TechBlogCard from "../components/TechBlog/TechCard";

export default function AdminPanel() {
    const [activeCategory, setActiveCategory] = useState("student-highlights");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [pendingPosts, setPendingPosts] = useState([]);

    const [pendingArticles, setPendingArticles] = useState([]);

    const [events, setEvents] = useState([
        { date: "2025-04-03", title: "Event 1" },
        { date: "2025-04-03", title: "Event 2" },
    ]);
    const [newEvent, setNewEvent] = useState("");
    const [newEventDate, setNewEventDate] = useState("");

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
            };
        };

        loadPosts(); //call function
        
    }, []); //only do this when the page first loads


    useEffect(() => {
        const loadArticles = async () => {
            try {
              const data = await techBlogService.getPendingArticles();
              console.log("Pending Articles:", data);
              setPendingArticles(data);
            } catch (err) {
              setError(err.message); // Say if something went wrong
            } finally {
              setIsLoading(false); // Say "we're done looking!"
            };
        };

        loadArticles(); //call function
        
    }, []); //only do this when the page first loads

    
    // Fetch events (placeholder)
    useEffect(() => {
        console.log("Fetching events...");
    }, []);


    // Handle category selection
    const handleSelect = (e) => {
        const selectedId = e.currentTarget.id;
        console.log("Selected:", selectedId);
        setActiveCategory(selectedId); // Update the active category
    };

    //Approve a post
    const handleApproveHighlight = async (postId) => {
        try {
            await studentHighlightService.approvePost(postId);
            console.log(`Approved post with ID: ${postId}`);

            setPendingPosts((prev) => prev.filter((post) => post.id !== postId)); // Remove the approved post from the list
        } catch (error) {
            console.error('Error approving post:', error);
        }
    };

    // Handle deleting a post
    const handleDeleteHighlight = async (postId) => {
        try {
            await studentHighlightService.deletePost(postId);
            console.log(`Deleted post with ID: ${postId}`);

            setPendingPosts((prev) => prev.filter((post) => post.id !== postId)); // Remove the approved post from the list
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

   //Approve a post
   const handleApproveArticle = async (postId) => {
        try {
            await techBlogService.approveArticle(postId);
            console.log(`Approved Article with ID: ${postId}`);

            setPendingArticles((prev) => prev.filter((post) => post.id !== postId)); // Remove the approved post from the list
        } catch (error) {
            console.error('Error approving Article:', error);
        }
};

    // Handle deleting a post
    const handleDeleteArticle = async (postId) => {
        try {
            await techBlogService.deleteArticle(postId);
            console.log(`Deleted post with ID: ${postId}`);

            setPendingArticles((prev) => prev.filter((post) => post.id !== postId)); // Remove the approved post from the list
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    // Handle adding a new event
    const handleAddEvent = () => {
        if (!newEvent.trim() || !newEventDate.trim()) return;
        console.log(`Adding event: ${newEvent} on ${newEventDate}`);
        setEvents((prev) => [...prev, { date: newEventDate, title: newEvent }]);
        setNewEvent("");
        setNewEventDate("");
    };

    return (
        <div className="p-6 flex-col justify-center max-w-5xl mx-auto">
            <h1 className="text-3xl flex justify-center font-bold text-stone-800 mb-6">Admin Panel</h1>

            {/* Admin Options Tab */}
            <div className = "flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-stone-700 mb-4">Pending Requests</h1>
                <div className="flex w-1/2 justify-end text-stone-700 font-semibold">
                    <div
                        className={`flex w-1/3 justify-center items-center p-1 rounded-lg outline-stone-300 outline-1 outline hover:bg-stone-300 transition-all ease-in-out duration-200 cursor-pointer ${activeCategory === "student-highlights" ? "bg-stone-300" : ""
                            }`}
                        onClick={handleSelect}
                        id="student-highlights"
                    >
                        <h2>Student Highlights</h2>
                    </div>
                    <div
                        className={`flex w-1/3 justify-center items-center p-1 rounded-lg  outline-stone-300 outline-1 outline hover:bg-stone-300 transition-all ease-in-out duration-200 cursor-pointer ${activeCategory === "tech-blog" ? "bg-stone-300" : ""
                            }`}
                        onClick={handleSelect}
                        id="tech-blog"
                    >
                        <h2>Technology Blog</h2>
                    </div>
                    <div
                        className={`flex w-1/3 justify-center  items-center rounded-lg p-1 outline-stone-300 outline-1 outline hover:bg-stone-300 transition-all ease-in-out duration-200 cursor-pointer ${activeCategory === "events" ? "bg-stone-300" : ""
                            }`}
                        onClick={handleSelect}
                        id="events"
                    >
                        <h2>Events</h2>
                    </div>
                </div>
            </div>

            {/* Pending Student Highlights Section */}
            {activeCategory === "student-highlights" && (
                <div className="">
                    <div className="w-full flex-col gap-4 flex items-center justify-center">
                        {pendingPosts.map((post, index) => (
                            <div className = "w-full flex flex-col items-center justify-center">
                                <StudentCard key={post.id} post={post} index={index} />
                                <div className="flex  py-1 gap-2">
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
            )}


            {/* Technology Blog Section */}
            {activeCategory === "tech-blog" && (
                <div className="">
                    <div className="w-full grid grid-cols-2 gap-4  items-center justify-center">
                        {pendingArticles.map((article, index) => (
                            <div className = "w-full flex flex-col items-center justify-center">
                                <TechBlogCard key={article.id} post={article} index={index} />
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
                                        to={`/tech-blog/edit/${article.id}`} 
                                        onClick={() => console.log(`Editing post with ID: ${article.id}`)}
                                        className="px-4 py-2 bg-orange-300 rounded-md hover:bg-orange-400 transition"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        ))}

                            {/* Show if we're still getting Posts */}
                            {isLoading && <p>Getting Posts...</p>}
                            {error && <p className="text-red-500">{error}</p>}
                            {pendingArticles.length === 0 && !isLoading && (
                                <p className="text-blue-300 text-lg">No Pending Tech Articles Requests</p>
                            )}

                    </div>
                </div>
            )}

            {/* Events Section */}
                {activeCategory === "events" && (
                <div className="space-y-4 p-3">

                    <h3 className="text-lg font-medium text-stone-800 mb-2">Events Page - Coming Soon</h3>
      
                </div>
            )}
        </div>

    );
}