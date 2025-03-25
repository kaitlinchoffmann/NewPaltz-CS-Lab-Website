import { useState, useEffect } from "react";
import StudentCard from "../components/StudentHighlights/studentCard";
import studentHighlightService from "../services/studentHighlightService";

export default function StudentHighlights() {

  // State to store blog posts
  const [blogPosts, setBlogPosts] = useState([]);

  //state to keep track of loading state
  const [isLoading, setIsLoading] = useState(true);

  //state to keep track of any errors
  const [error, setError] = useState(null);

  //state to keep track of selected category
  const [selectedCategory, setSelectedCategory] = useState('recent posts');

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

  const filteredResources = selectedCategory === 'recent posts'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-4">Student Projects </h1>
        <button className="bg-orange-300 hover:bg-orange-400 hover:shadow-lg hover:scale-105 transition-all ease-in-out duration-300 p-2 rounded-lg">Submit A Project</button>
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
      <div className=" group flex flex-wrap gap-4 justify-center">
        {filteredResources.map((post, index) => (
          <StudentCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </div>
  );
}