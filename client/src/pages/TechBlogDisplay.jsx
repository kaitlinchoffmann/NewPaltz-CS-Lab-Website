import { useState, useEffect } from "react";
import TechCard from "../components/TechBlog/TechCard";
import techBlogService from "../services/techBlogService";

export default function TechBlogDisplay() {

  // State to store blog posts
  const [blogPosts, setBlogPosts] = useState([]);

  //state to keep track of loading state
  const [isLoading, setIsLoading] = useState(true);

  //state to keep track of any errors
  const [error, setError] = useState(null);


  //when the page loads, get the blog posts
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

    loadPosts(); //call function

  }, []); //only do this when the page first loads


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Tech Articles</h1>

      {/* Show if we're still getting  Posts */}
      {isLoading && <p>Getting Blog Posts...</p>}

      {/* Show if something went wrong */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display Tech Blog Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {blogPosts.map((post) => (
          <TechCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

