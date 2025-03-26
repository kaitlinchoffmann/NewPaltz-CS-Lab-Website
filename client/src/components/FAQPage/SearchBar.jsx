import { IoIosSearch } from "react-icons/io";


export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="flex gap-2 items-center flex-row ">
      <IoIosSearch size={25}/>
      <input
        type="text"
        placeholder="Search Questions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className=" p-2 border rounded-md "
      />
    </div>
  );
  }