import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Ensure Link is imported correctly
import FaqCard from "../FAQPage/faqCard";
import SearchBar from "../FAQPage/SearchBar";
import faqService from "../../services/faqService";


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
    const cardsPerPage = 6;

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

    // Handle deleting a faq
    const handleDelete = async (faqID) => {
        if (!faqID) {
            console.error("FAQ ID is undefined");
            return;
        }
        try {
            await faqService.deleteFAQ(faqID);
            console.log(`Deleted FAQ with ID: ${faqID}`);
            // Optionally, update the state to remove the deleted FAQ
            setFaq((prevFaq) => prevFaq.filter((f) => f.id !== faqID));
        } catch (error) {
            console.error(`Error deleting faq with id: ${faqID}`, error);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            {/* Heading Container - Title & Search Box */}
            <div className="flex justify-between mb-6">
                <Link to = "/create-faq"
                    className = "px-4 py-2 bg-yellow-300 rounded-md hover:bg-yellow-400 transition"
                >
                    Add FAQ
                </Link>

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
                    <div className="w-full flex flex-col items-center justify-center" key={faq.id}>
                        <FaqCard key={faq.id} faq={faq} index={index} />
                        <div className="flex py-1 gap-2">
                            <Link to={`faq/edit/${faq.id}`}
                                className="px-4 py-2 bg-green-300 rounded-md hover:bg-green-400 transition"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(faq.id)} 
                                className="px-4 py-2 bg-red-300 rounded-md hover:bg-red-400 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
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

