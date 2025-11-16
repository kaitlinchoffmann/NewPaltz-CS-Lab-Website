import React, { useState, useEffect } from "react";
import PendingHighlights from "../../components/AdminPanel/PendingHighlights";
import PendingArticles from "../../components/AdminPanel/PendingArticles";
import FAQSection from "../../components/AdminPanel/FAQSection";
import FacultySection from "../../components/AdminPanel/FacultySection";
import StudentResourceSection from "../../components/AdminPanel/StudentResourceSection";
import HighlightsSection from "../../components/AdminPanel/HighlightsSection";
import TechBlogSection from "../../components/AdminPanel/TechBlogSection";
import PendingAccountsSection from "../../components/AdminPanel/PendingAccountsSection";
import UserControlsSection from "../../components/AdminPanel/UserControlsSection";
// import TestScriptSection from "../../components/AdminPanel/TestScript";
import { adminService } from "../../services/adminService";
import { Link } from "react-router-dom";

export default function AdminPanel() {
    const [activeCategory, setActiveCategory] = useState("student-highlights");
    const [admins, setAdmins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleSelect = (category) => {
        setActiveCategory(category);
    };

    useEffect(() => {
        const loadAdmins = async () => {
            try {
                setIsLoading(true);
                const admins = await adminService.getAllAdmins();
                setAdmins(admins);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadAdmins();
    }, []);

    const handleDelete = async (adminId) => {
        if (window.confirm("Are you sure you want to delete this Admin?")) {
            try {
                await adminService.deleteAdmin(adminId);
                setAdmins((prev) => prev.filter((a) => a.id !== adminId));
            } catch (err) {
                alert("Failed to delete admin. Please try again.");
            }
        }
    };

    return (
        <div className="flex min-h-screen mx-auto">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
                </div>

                <nav className="px-4 py-6 space-y-2">
                    {/* Student Highlights */}
                    <div>
                        <button
                            onClick={() =>
                                setOpenDropdown(openDropdown === "studenthighlights" ? null : "studenthighlights")
                            }
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left transition-all text-gray-700 hover:bg-gray-100"
                        >
                            <i className="fas fa-folder"></i> Student Highlights
                        </button>

                        {openDropdown === "studenthighlights" && (
                            <div className="ml-6 mt-1 space-y-1">
                                <button
                                    onClick={() => handleSelect("cur-student-highlights")}
                                    className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-all ${activeCategory === "cur-student-highlights"
                                        ? "bg-gray-200 text-gray-900"
                                        : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    Student Highlights
                                </button>

                                <button
                                    onClick={() => handleSelect("student-highlights")}
                                    className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-all ${activeCategory === "student-highlights"
                                        ? "bg-gray-200 text-gray-900"
                                        : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    Pending Student Highlights
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Tech Blog */}
                    <div>
                        <button
                            onClick={() => setOpenDropdown(openDropdown === "techblog" ? null : "techblog")}
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left transition-all text-gray-700 hover:bg-gray-100"
                        >
                            <i className="fas fa-folder"></i> Technology Blog
                        </button>

                        {openDropdown === "techblog" && (
                            <div className="ml-6 mt-1 space-y-1">
                                <button
                                    onClick={() => handleSelect("cur-tech-blog")}
                                    className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-all ${activeCategory === "cur-tech-blog"
                                        ? "bg-gray-200 text-gray-900"
                                        : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    Technology Blog
                                </button>

                                <button
                                    onClick={() => handleSelect("tech-blog")}
                                    className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-all ${activeCategory === "tech-blog"
                                        ? "bg-gray-200 text-gray-900"
                                        : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    Pending Technology Blog
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Events */}
                    <div>
                        <button
                            onClick={() => setOpenDropdown(openDropdown === "events" ? null : "events")}
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left transition-all text-gray-700 hover:bg-gray-100"
                        >
                            <i className="fas fa-folder"></i> Events
                        </button>

                        {openDropdown === "events" && (
                            <div className="ml-6 mt-1 space-y-1">
                                <button
                                    onClick={() => handleSelect("events")}
                                    className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-all ${activeCategory === "events"
                                        ? "bg-gray-200 text-gray-900"
                                        : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    Events
                                </button>

                                <button
                                    onClick={() => handleSelect("events")}
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
                        onClick={() => handleSelect("faq")}
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left transition-all ${activeCategory === "faq" ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        FAQs
                    </button>

                    <button
                        onClick={() => handleSelect("faculty-directory")}
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left transition-all ${activeCategory === "faculty-directory"
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        Faculty Directory
                    </button>

                    <button
                        onClick={() => handleSelect("student-resources")}
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left transition-all ${activeCategory === "student-resources"
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        Student Resources
                    </button>

                    <button
                        onClick={() => handleSelect("pending-accounts")}
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left transition-all ${activeCategory === "pending-accounts"
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        Pending Accounts
                    </button>

                    <button
                        onClick={() => handleSelect("user-controls")}
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left transition-all ${activeCategory === "user-controls"
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        User Controls
                    </button>
                </nav>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-6 overflow-x-auto">
                {activeCategory === "student-highlights" && <PendingHighlights />}
                {activeCategory === "tech-blog" && <PendingArticles />}
                {activeCategory === "faq" && <FAQSection />}
                {activeCategory === "faculty-directory" && <FacultySection />}
                {activeCategory === "student-resources" && <StudentResourceSection />}
                {activeCategory === "cur-student-highlights" && <HighlightsSection />}
                {activeCategory === "cur-tech-blog" && <TechBlogSection />}
                {activeCategory === "pending-accounts" && <PendingAccountsSection />}
                {activeCategory === "user-controls" && (
                    <UserControlsSection admins={admins} handleDelete={handleDelete} />
                )}

                {activeCategory === "events" && (
                    <div className="space-y-4 p-3">
                        <h3 className="text-lg font-medium text-stone-800 mb-2">Events Page - Coming Soon</h3>

                        <div className="flex-col justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold text-stone-700 mb-4">User Controls</h1>

                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-stone-300">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border-b">Username</th>
                                            <th className="px-4 py-2 border-b">Email</th>
                                            <th className="px-4 py-2 border-b">Role</th>
                                            <th className="px-4 py-2 border-b">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {admins.map((admin) => (
                                            <tr key={admin.id} className="text-center">
                                                <td className="px-4 py-2 border-b">{admin.user}</td>
                                                <td className="px-4 py-2 border-b">{admin.email}</td>
                                                <td className="px-4 py-2 border-b">{admin.role}</td>
                                                <td className="px-4 py-2 border-b">
                                                    <Link
                                                        to={`/admin-panel/users/edit-admin/${admin.id}`}
                                                        className="bg-green-300 rounded px-3 py-1 hover:bg-green-400 mr-2 transition-all ease-in duration-300"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        onClick={() => handleDelete(admin.id)}
                                                        className="bg-rose-300 rounded px-3 py-1 hover:bg-rose-400 transition-all ease-in duration-300"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* TEST SCRIPT — COMMENTED OUT PROPERLY */}
                                {/*
                                <div>
                                    <h1>Script Test</h1>
                                    <p>Click the button below to test the backend script:</p>
                                    <TestScriptSection />
                                    <p>Check the console or below for output.</p>
                                </div>
                                */}

                                <div className="mt-4">
                                    <Link
                                        to="/admin-panel/users/create-user"
                                        className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Add User
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}