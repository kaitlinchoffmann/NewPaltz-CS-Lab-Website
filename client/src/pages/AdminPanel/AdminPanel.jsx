// src/pages/Admin/AdminPanel.jsx
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { useLocation } from "react-router-dom";
import PendingHighlights from '../../components/AdminPanel/PendingHighlights';
import HighlightsSection from '../../components/AdminPanel/HighlightsSection';
import PendingArticles from '../../components/AdminPanel/PendingArticles';
import TechBlogSection from '../../components/AdminPanel/TechBlogSection';
import FAQSection from '../../components/AdminPanel/FAQSection';
import FacultySection from '../../components/AdminPanel/FacultySection';
import StudentResourceSection from '../../components/AdminPanel/StudentResourceSection';
import PendingAccountsSection from '../../components/AdminPanel/PendingAccountsSection';
import UserControlsSection from '../../components/AdminPanel/UserControlsSection';

import PendingEvents from '../../components/AdminPanel/PendingEvents';
import EventsSection from '../../components/AdminPanel/EventsSection';

import MonitoringPanelPage from './MonitoringPanelPage';

import CoursesManagement from './Courses/CoursesManagement';
import CompExamSection from '../../components/AdminPanel/CompExamSection';

import { adminService } from '../../services/adminService';

export default function AdminPanel() {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const initialCategory = location.state?.activeCategory || 'student-highlights';
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [admins, setAdmins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleSelect = (category) => setActiveCategory(category);
    const handleDelete = (id) => console.log('Delete admin with id:', id);

    const canAccess = (roles) => roles.includes(user.role);

    // Load admins
    useEffect(() => {
        const loadAdmins = async () => {
            try {
                setIsLoading(true);
                const data = await adminService.getAllAdmins();
                setAdmins(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        loadAdmins();
    }, []);

    useEffect(() => {
        if (location.state?.activeCategory) {
            setActiveCategory(location.state.activeCategory);
        }
    }, [location.state]);

    // Panel configuration
    const panels = [
        {
            key: 'student-highlights', label: 'Student Highlights', roles: ['admin', 'editor'], children: [
                { key: 'pending', label: 'Pending Student Highlights', component: <PendingHighlights /> },
                { key: 'current', label: 'Current Student Highlights', component: <HighlightsSection /> },
            ]
        },
        {
            key: 'tech-blog', label: 'Technology Blog', roles: ['admin', 'editor'], children: [
                { key: 'tech-blog', component: <PendingArticles />, label: 'Pending Technology Blog' },
                { key: 'cur-tech-blog', component: <TechBlogSection />, label: 'Current Tech Blog' },
            ]
        },
        {
            key: 'events', label: 'Events', roles: ['admin', 'editor', 'club'], children: [
                { key: 'pending-events', label: 'Pending Events', component: <PendingEvents /> },
                { key: 'current-events', label: 'Current Events', component: <EventsSection /> },
            ]
        },
        { key: 'faq', component: <FAQSection />, roles: ['admin'], label: 'FAQs' },
        { key: 'faculty-directory', component: <FacultySection />, roles: ['admin', 'editor'], label: 'Faculty Directory' },
        { key: 'student-resources', component: <StudentResourceSection />, roles: ['admin', 'editor'], label: 'Student Resources' },
        { key: 'courses', component: <CoursesManagement />, roles: ['admin', 'editor'], label: 'Courses' },
        { key: 'comp-exam', component: <CompExamSection />, roles: ['admin'], label: 'Comp Exam Settings' },
        { key: 'pending-accounts', component: <PendingAccountsSection />, roles: ['admin'], label: 'Pending Accounts' },
        { key: 'user-controls', component: <UserControlsSection admins={admins} handleDelete={handleDelete} />, roles: ['admin'], label: 'User Controls' },

        { key: 'monitoring-panel', component: <MonitoringPanelPage />, roles: ['admin'], label: 'Monitoring Panel' },



    ];

    if (loading) return <p>Loading user...</p>;
    if (!user) return <p>You are not authorized to view this page.</p>;
    if (isLoading) return <p>Loading admins...</p>;
    if (error) return <p>Error:{error}</p>;

    function ComingSoon() {
        return (
            <div className="p-4 text-gray-700 bg-gray-50 rounded-md border border-gray-200">
                Events is coming soon!
            </div>
        );
    }
    return (
        <div className="flex min-h-screen mx-auto">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
                </div>
                <nav className="px-4 py-6 space-y-2">
                    {panels
                        .filter(panel => canAccess(panel.roles))
                        .map(panel => {
                            // Determine if dropdown needed
                            const isDropdown = ['student-highlights', 'tech-blog', 'events'].includes(panel.key);
                            return (
                                <div key={panel.key}>
                                    {panel.children ? (
                                        <>
                                            {/* Parent button */}
                                            <button
                                                onClick={() =>
                                                    setOpenDropdown(openDropdown === panel.key ? null : panel.key)
                                                }
                                                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left transition-all text-gray-700 hover:bg-gray-100"
                                            >
                                                {panel.label}
                                                <span className="ml-auto">
                                                    <svg
                                                        className={`w-4 h-4 transition-transform ${openDropdown === panel.key ? 'rotate-180' : ''
                                                            }`}
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </span>
                                            </button>

                                            {/* Child dropdown items */}
                                            {openDropdown === panel.key && (
                                                <div className="mt-1 space-y-1 ">
                                                    {panel.children.map(sub => (
                                                        <button
                                                            key={sub.key}
                                                            onClick={() => handleSelect(sub.key)}
                                                            className={`block w-full text-left pl-10 pr-3 py-2 text-sm font-medium rounded-md transition-all ${activeCategory === sub.key
                                                                ? 'bg-gray-200 text-gray-900'
                                                                : 'text-gray-700 hover:bg-gray-100'
                                                                }`}
                                                        >
                                                            {sub.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => handleSelect(panel.key)}
                                            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left transition-all ${activeCategory === panel.key
                                                ? 'bg-gray-200 text-gray-900'
                                                : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            {panel.label}
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                </nav>

            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-x-auto">
                {/* Check top-level panels */}
                {panels.map(panel => {
                    // child?
                    if (panel.children) {
                        const child = panel.children.find(c => c.key === activeCategory);
                        if (child) {
                            return <div key={child.key}>{child.component}</div>;
                        }
                    }

                    // regular (non-child) panel
                    if (panel.key === activeCategory) {
                        return <div key={panel.key}>{panel.component}</div>;
                    }

                    return null;
                })}
            </main>

        </div>
    );

}
