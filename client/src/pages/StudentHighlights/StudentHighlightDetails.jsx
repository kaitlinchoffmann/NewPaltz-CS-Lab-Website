import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import studentHighlightService from "../../services/studentHighlightService";

export default function StudentHighlightDetails() {
    const { id } = useParams(); // Get the post ID from the URL
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await studentHighlightService.getPostById(id); // Fetch the post by ID
                setPost(data);
            } catch (err) {
                setError("Failed to load the post. Please try again.");
                console.error("Error fetching post:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (isLoading) {
        return <p>Loading post...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!post) {
        return <p>No post found.</p>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="py-8">
                    <h1 className="text-3xl font-bold mb-2">{post.project_title}</h1>
                    <p className="text-gray-500 text-sm">
                        {/* Submission Date */}
                        Published on <time dateTime={post.submission_date}>{post.submission_date}</time>
                    </p>
                </div>

                {/* Featured image */}
                {post.headshot_url && (
                    <img
                        src={post.imageUrl}
                        alt="Featured"
                        className="w-full h-auto mb-8"
                    />
                )}

                {/* Content */}
                <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
                    <p>{post.project_description}</p>
                    <p>Author: {post.student_name}</p>
                    {post.githubLink && (
                        <p>
                            GitHub:{" "}
                            <a
                                href={post.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                {post.githubLink}
                            </a>
                        </p>
                    )}
                    {post.websiteLink && (
                        <p>
                            Website:{" "}
                            <a
                                href={post.websiteLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                {post.websiteLink}
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}