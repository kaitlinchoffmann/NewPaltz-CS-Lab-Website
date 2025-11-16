import React, { useState, useEffect } from "react";
import { adminService } from "../../services/adminService";

import { Link } from "react-router-dom";


export default function EditorPanel() {
    const [activeCategory, setActiveCategory] = useState("student-highlights");
    const [admins, setAdmins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);

    // Handle category selection
    const handleSelect = (category) => {
        setActiveCategory(category);
    };




    return (
        <div className="flex min-h-screen mx-auto">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 ">
                {/* Top section */}
                <div className="p-4 border-b border-gray-200">
                    <h1 className="text-lg font-bold text-gray-800">Editor Panel</h1>
                </div>

                {/* Nav Links */}
                <nav className="px-4 py-6 space-y-2">






                    {/*Events */}
                    <div>
                        <button
                            onClick={() => setOpenDropdown(openDropdown === "events" ? null : "events")}
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left transition-all text-gray-700 hover:bg-gray-100"
                        >
                            <i className="fas fa-folder"></i> Events
                            <span className="ml-auto">
                                {/* Dropdown Arrow */}
                                <svg
                                    className={`w-4 h-4 transition-transform ${openDropdown === "events" ? "rotate-180" : ""}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </button>
                        {/* Dropdown Menu */}
                        {openDropdown === "events" && (
                            <div className="ml-6 mt-1 space-y-1">
                                <button
                                    onClick={() => { handleSelect("events"); }}
                                    className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-all ${activeCategory === "events"
                                        ? "bg-gray-200 text-gray-900"
                                        : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    Events
                                </button>
                                <button
                                    onClick={() => { handleSelect("events"); }}
                                    className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-all ${activeCategory === "events"
                                        ? "bg-gray-200 text-gray-900"
                                        : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    Pending Events
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => handleSelect("faculty-directory")}
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left transition-all ${activeCategory === "faculty-directory"
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        <i className="fas fa-chart-line"></i> Faculty Directory
                    </button>

                </nav>
            </aside >

            {/* Main Content Area */}
            <main className="flex-1 p-6 overflow-x-auto">


                {/* Events Section */}
                {activeCategory === "events" && (
                    <div className="space-y-4 p-3">

                        <h3 className="text-lg font-medium text-stone-800 mb-2">Events Page - Coming Soon</h3>

                    </div>
                )}

            </main>

            {/* TEST SCRIPT SECTION WILL BE REMOVED LATER ON */}
            {/* <div>

              // test script
                <h1>Script Test</h1>
                <p>Click the button below to test the backend script:</p>

                <TestScriptSection />

                <p>Check the console or below for output.</p>
            </div>

            <div className="mt-4">
                <Link to="/admin-panel/users/create-user"
                    className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-4lue-600">
                    Add User
                </Link>
            </div> */}
        </div>


    );
}