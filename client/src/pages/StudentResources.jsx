import { useState, useEffect } from "react";
import ResourceCard from "../components/StudentResources/ResourceCard";
import SearchBar from "../components/StudentResources/SearchBar";
import resourceService from "../services/resourceService";

export default function StudentResources() {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadResources = async () => {
      try {
        setIsLoading(true);
        const data = await resourceService.getAllResources();
        console.log('Resources loaded:', data);
        setResources(data);
      } catch (err) {
        console.error('Error loading resources:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadResources();
  }, []);

  const filteredResources = searchQuery
    ? resources.filter(resource =>
      resource.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : resources;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl text-stone-800 font-bold mb-4">Student Resources</h1>

        {isLoading && <p>Loading resources...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 mt-4">
        {filteredResources.map((resource, index) => (
          <ResourceCard key={resource.id} studentResource={resource} index={index} />
        ))}
      </div>
    </div>
  );
}