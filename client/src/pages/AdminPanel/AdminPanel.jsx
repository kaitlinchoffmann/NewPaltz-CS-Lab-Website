import React, { useState, useEffect } from "react";
import PendingHighlights from "../../components/AdminPanel/PendingHighlights";
import PendingArticles from "../../components/AdminPanel/PendingArticles";
import FAQSection from "../../components/AdminPanel/FAQSection"
import FacultySection from "../../components/AdminPanel/FacultySection"
import StudentResourceSection from "../../components/AdminPanel/StudentResourceSection";
import HighlightsSection from "../../components/AdminPanel/HighlightsSection";
import TechBlogSection from "../../components/AdminPanel/TechBlogSection";
import PendingAccountReq from "../../components/AdminPanel/PendingAccountReq";
import { adminService } from "../../services/adminService";
import { Link } from "react-router-dom";

export default function AdminPanel() {
    const [activeCategory, setActiveCategory] = useState("student-highlights");
    const [admins, setAdmins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Handle category selection
    const handleSelect = (e) => {
        const selectedId = e.currentTarget.id;
        setActiveCategory(selectedId); // Update the active category
    };

    useEffect(() => {
        const loadAdmins = async () => {
            try {
                setIsLoading(true);
                const admins = await adminService.getAllAdmins();
                setAdmins(admins);
            } catch (err) {
                console.error("Error loading admins:", err);
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
                setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== adminId));
            } catch (err) {
                console.error("Error deleting admin:", err);
                alert("Failed to delete admin. Please try again.");
            }
        }
    };

    return (
        <div className="p-6 flex-col justify-center max-w-5xl mx-auto">
            <h1 className="text-3xl flex justify-center font-bold text-stone-800 mb-6">Admin Panel</h1>

            {/* Admin Options Tab */}
            <div className="flex-col justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-stone-700 mb-4">Pending Requests</h1>
                <div className="flex w-1/2 items-end text-stone-700 font-semibold">
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
                        className={`flex w-1/3 justify-center items-center p-1 rounded-lg outline-stone-300 outline-1 outline hover:bg-stone-300 transition-all ease-in-out duration-200 cursor-pointer ${activeCategory === "events" ? "bg-stone-300" : ""}`}
                        onClick={handleSelect}
                        id="events"
                    >
                        <h2>Events</h2>
                    </div>

                    <div
                        className={`flex w-1/3 justify-center items-center p-1 rounded-lg outline-stone-300 outline-1 outline hover:bg-stone-300 transition-all ease-in-out duration-200 cursor-pointer ${activeCategory === "pending-accounts" ? "bg-stone-300" : ""}`}
                        onClick={handleSelect}
                        id="pending-accounts"
                    >
                        <h2>Pending Accounts</h2>
                    </div>
                </div>
            </div>
            {/* Pending Student Highlights Section */}
            {activeCategory === "student-highlights" && (
                <PendingHighlights />
            )}


            {/* Technology Blog Section */}
            {activeCategory === "tech-blog" && (
                <PendingArticles />
            )}

            {/* Events Section */}
            {activeCategory === "events" && (
                <div className="space-y-4 p-3">

                    <h3 className="text-lg font-medium text-stone-800 mb-2">Events Page - Coming Soon</h3>

                </div>
            )}

            {/* Pending Accounts Section */}
            {activeCategory === "pending-accounts" && (
                <PendingAccountReq />
            )}

            {/* Admin Options Tab - Resources */}
            <div className="flex-col justify-between items-center mb-6">
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
                    <div
                        className={`flex w-1/3 justify-center  items-center rounded-lg p-1 outline-stone-300 outline-1 outline hover:bg-stone-300 transition-all ease-in-out duration-200 cursor-pointer ${activeCategory === "student-resources" ? "bg-stone-300" : ""
                            }`}
                        onClick={handleSelect}
                        id="PendingAccountReq"
                    >
                        <h2>Student Resources</h2>
                    </div>
                    <div
                        className={`flex w-1/3 justify-center items-center p-1 rounded-lg outline-stone-300 outline-1 outline hover:bg-stone-300 transition-all ease-in-out duration-200 cursor-pointer ${activeCategory === "events" ? "bg-stone-300" : ""}`}
                        onClick={handleSelect}
                        id="events"
                    >
                        <h2>Events</h2>
                    </div>
                </div>
            </div>

            {/* Faqs section */}
            {activeCategory === "faq" && (
                <FAQSection />
            )}

            {/* Faculty directory section */}
            {activeCategory === "faculty-directory" && (
                <FacultySection />
            )}

            {/* Student Resources section */}
            {activeCategory === "student-resources" && (
                <StudentResourceSection />
            )}

            {/* Current Student Highlights section */}
            {activeCategory === "cur-student-highlights" && (
                <HighlightsSection />
            )}

            {/* Current Tech Blog section */}
            {activeCategory === "cur-tech-blog" && (
                <TechBlogSection />
            )}
            {/* Pending Accounts Section */}
            {activeCategory === "pending-accounts" && (
                <PendingAccountReq />)}

            {/* User management section
            TODO: make into its own component */}
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
                                        <Link to={`/admin-panel/users/edit-admin/${admin.id}`}
                                            className="bg-green-300 rounded px-3 py-1 hover:bg-green-400 mr-2 transition-all ease-in duration-300">Edit</Link>
                                        <button
                                            onClick={() => handleDelete(admin.id)}
                                            className="bg-rose-300 rounded px-3 py-1 hover:bg-rose-400 transition-all ease-in duration-300">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4">
                        <Link to="/admin-panel/users/create-user"
                            className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-4lue-600">
                            Add User
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
}