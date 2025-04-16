import React, { useState, useEffect } from "react";
import PendingHighlights from "../../components/AdminPanel/PendingHighlights";
import PendingArticles from "../../components/AdminPanel/PendingArticles";
import FAQSection from "../../components/AdminPanel/FAQSection"
import FacultySection from "../../components/AdminPanel/FacultySection"

export default function AdminPanel() {
    const [activeCategory, setActiveCategory] = useState("student-highlights");

    // Handle category selection
    const handleSelect = (e) => {
        const selectedId = e.currentTarget.id;
        console.log("Selected:", selectedId);
        setActiveCategory(selectedId); // Update the active category
    };

    return (
        <div className="p-6 flex-col justify-center max-w-5xl mx-auto">
            <h1 className="text-3xl flex justify-center font-bold text-stone-800 mb-6">Admin Panel</h1>

            {/* Admin Options Tab */}
            <div className = "flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-stone-700 mb-4">Pending Requests</h1>
                <div className="flex w-1/2 justify-end text-stone-700 font-semibold">
                    <div
                        className={`flex w-1/3 justify-center items-center p-1 rounded-lg outline-stone-300 outline-1 outline hover:bg-stone-300 transition-all ease-in-out duration-200 cursor-pointer ${activeCategory === "student-highlights" ? "bg-stone-300" : ""
                            }`}
                        onClick={handleSelect}
                        id="student-highlights"
                    >
                        <h2>Student Highlights</h2>
                    </div>
                    <div
                        className={`flex w-1/3 justify-center items-center p-1 rounded-lg  outline-stone-300 outline-1 outline hover:bg-stone-300 transition-all ease-in-out duration-200 cursor-pointer ${activeCategory === "tech-blog" ? "bg-stone-300" : ""
                            }`}
                        onClick={handleSelect}
                        id="tech-blog"
                    >
                        <h2>Technology Blog</h2>
                    </div>
                    <div
                        className={`flex w-1/3 justify-center  items-center rounded-lg p-1 outline-stone-300 outline-1 outline hover:bg-stone-300 transition-all ease-in-out duration-200 cursor-pointer ${activeCategory === "events" ? "bg-stone-300" : ""
                            }`}
                        onClick={handleSelect}
                        id="events"
                    >
                        <h2>Events</h2>
                    </div>
                </div>
            </div>

            {/* Pending Student Highlights Section */}
            {activeCategory === "student-highlights" && (
                <PendingHighlights/>
            )}


            {/* Technology Blog Section */}
            {activeCategory === "tech-blog" && (
                <PendingArticles/>
            )}



            {/* Events Section */}
            {activeCategory === "events" && (
            <div className="space-y-4 p-3">

                <h3 className="text-lg font-medium text-stone-800 mb-2">Events Page - Coming Soon</h3>
    
            </div>
            )}

            {/* Admin Options Tab - Resources */}
            <div className = "flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-stone-700 mb-4">Existing Components</h1>
                <div className="flex w-full justify-end text-stone-700 font-semibold">
                    <div
                        className={`flex w-1/3 justify-center items-center p-1 rounded-lg outline-stone-300 outline-1 outline hover:bg-stone-300 transition-all ease-in-out duration-200 cursor-pointer ${activeCategory === "cur-student-highlights" ? "bg-stone-300" : ""
                            }`}
                        onClick={handleSelect}
                        id="cur-student-highlights"
                    >
                        <h2>Student Highlights</h2>
                    </div>
                    <div
                        className={`flex w-1/3 justify-center items-center p-1 rounded-lg  outline-stone-300 outline-1 outline hover:bg-stone-300 transition-all ease-in-out duration-200 cursor-pointer ${activeCategory === "cur-tech-blog" ? "bg-stone-300" : ""
                            }`}
                        onClick={handleSelect}
                        id="cur-tech-blog"
                    >
                        <h2>Technology Blog</h2>
                    </div>
                    <div
                        className={`flex w-1/3 justify-center  items-center rounded-lg p-1 outline-stone-300 outline-1 outline hover:bg-stone-300 transition-all ease-in-out duration-200 cursor-pointer ${activeCategory === "cur-events" ? "bg-stone-300" : ""
                            }`}
                        onClick={handleSelect}
                        id="cur-events"
                    >
                        <h2>Events</h2>
                    </div>

                    <div
                        className={`flex w-1/3 justify-center items-center p-1 rounded-lg outline-stone-300 outline-1 outline hover:bg-stone-300 transition-all ease-in-out duration-200 cursor-pointer ${activeCategory === "faq" ? "bg-stone-300" : ""
                            }`}
                        onClick={handleSelect}
                        id="faq"
                    >
                        <h2>FAQs</h2>
                    </div>
                    <div
                        className={`flex w-1/3 justify-center items-center p-1 rounded-lg  outline-stone-300 outline-1 outline hover:bg-stone-300 transition-all ease-in-out duration-200 cursor-pointer ${activeCategory === "faculty-directory" ? "bg-stone-300" : ""
                            }`}
                        onClick={handleSelect}
                        id="faculty-directory"
                    >
                        <h2>Faculty Directory</h2>
                    </div>
                    <div
                        className={`flex w-1/3 justify-center  items-center rounded-lg p-1 outline-stone-300 outline-1 outline hover:bg-stone-300 transition-all ease-in-out duration-200 cursor-pointer ${activeCategory === "student-resources" ? "bg-stone-300" : ""
                            }`}
                        onClick={handleSelect}
                        id="student-resources"
                    >
                        <h2>Student Resources</h2>
                    </div>
                </div>
            </div>

            {/* Faqs section */}
            {activeCategory === "faq" && (
                <FAQSection/>
            )}

            {/* Faqs section */}
            {activeCategory === "faculty-directory" && (
                <FacultySection/>
            )}

        </div>

    );
}