import { useState, useEffect } from "react";
import FaqCard from "../components/FAQPage/FAQCard";
import SearchBar from "../components/FAQPage/SearchBar";
import faqService from "../services/faqService";

export default function FAQ() {

  // State to store faq
  const [faq, setFaq] = useState([]);

  //state to keep track of loading state
  const [isLoading, setIsLoading] = useState(true);

  //state to keep track of any errors
  const [error, setError] = useState(null);

  // State to store search query
  const [searchQuery, setSearchQuery] = useState("");

  //when the page loads, get the faq
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

    loadFaq(); //call function

  }, []); //only do this when the page first loads

  // Filter faq based on search
  const filteredFaq = searchQuery
    ? faq.filter(f =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : faq;


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>

      {/* Show if we're still getting the faq */}
      {isLoading && <p>Getting Frequently Asked Questions...</p>}

      {/* Show if something went wrong */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Our search box */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Display faq cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {filteredFaq.map((faq) => (
          <FaqCard key={faq.id} faq={faq} />
        ))}
      </div>
    </div>
  );
}

