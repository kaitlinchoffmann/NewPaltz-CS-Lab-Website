


export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="flex items-center sm:w-auto">
      <input
        type="text"
        placeholder="Search Resources..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className=" px-4 py-2 border border-stone-300 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white shadow-sm"
      />
    </div>
  );
}
