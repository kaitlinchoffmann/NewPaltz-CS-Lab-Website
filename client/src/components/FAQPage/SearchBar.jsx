

export default function SearchBar({ searchQuery, setSearchQuery }) {
    return (
      <input
        type="text"
        placeholder="Search Faqs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      />
    );
  }