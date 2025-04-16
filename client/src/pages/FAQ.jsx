import { useState, useEffect } from "react";
import SearchBar from "../components/FAQPage/SearchBar";
import FaqCard from "../components/FAQPage/faqCard";
import faqService from "../services/faqService";

export default function FAQ() {
  // State to store faq
  const [faq, setFaq] = useState([]);

  // State to keep track of loading state
  const [isLoading, setIsLoading] = useState(true);

  // State to keep track of any errors
  const [error, setError] = useState(null);

  // State to store search query
  const [searchQuery, setSearchQuery] = useState("");

  // State to keep track of the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Number of FAQ cards per page
  const cardsPerPage = 12;

  // When the page loads, get the faq
  useEffect(() => {
    const loadFaq = async () => {
      try {
        const data = await faqService.getAllFaq();
        setFaq(data);
      } catch (err) {
        setError(err.message); // Say if something went wrong
      } finally {
        setIsLoading(false);
      }
    };

    loadFaq(); // Call function
  }, []); // Only do this when the page first loads

  // Filter faq based on search
  const filteredFaq = searchQuery
    ? faq.filter(f =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : faq;

  // Calculate the index of the first and last FAQ card on the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  // Get the current FAQ cards to display
  const currentFaq = filteredFaq.slice(indexOfFirstCard, indexOfLastCard);

  // Function to handle page change
  const handlePageChange = (direction) => {
    if (direction === "next" && indexOfLastCard < filteredFaq.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Heading Container - Title & Search Box */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl text-stone-800 font-bold mb-4">Frequently Asked Questions</h1>

        {/* Our search box */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {/* Show if we're still getting the faq */}
      {isLoading && <p>Getting Frequently Asked Questions...</p>}

      {/* Show if something went wrong */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display faq cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 mt-4">
        {currentFaq.map((faq, index) => (
          <FaqCard key={faq.id} faq={faq} index={index} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-stone-300 rounded enabled:hover:scale-110 transition-all-ease duration-300 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange("next")}
          disabled={indexOfLastCard >= filteredFaq.length}
          className="px-4 py-2 mx-2 bg-stone-300 enabled:hover:scale-110 transition-all-ease duration-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

