import React, { useState, useEffect } from 'react';
import PendingHighlights from '../../components/AdminPanel/PendingHighlights';
import PendingArticles from '../../components/AdminPanel/PendingArticles';
import FAQSection from '../../components/AdminPanel/FAQSection';
import FacultySection from '../../components/AdminPanel/FacultySection';
import StudentResourceSection from '../../components/AdminPanel/StudentResourceSection';
import HighlightsSection from '../../components/AdminPanel/HighlightsSection';
import TechBlogSection from '../../components/AdminPanel/TechBlogSection';
import PendingSDAccounts from '../../components/AdminPanel/PendingSDAccounts';
import PendingAccountsSection from '../../components/AdminPanel/PendingAccountsSection';
import UserControlsSection from '../../components/AdminPanel/UserControlsSection';
//import TestScriptSection from "../../components/AdminPanel/TestScript";
import { adminService } from '../../services/adminService';

import { Link } from 'react-router-dom';

export default function AdminPanel() {
  const [activeCategory, setActiveCategory] = useState('student-highlights');
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Handle category selection
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
        console.error('Error loading admins:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadAdmins();
  }, []);

  const handleDelete = async (adminId) => {
    if (window.confirm('Are you sure you want to delete this Admin?')) {
      try {
        await adminService.deleteAdmin(adminId);
        setAdmins((prevAdmins) =>
          prevAdmins.filter((admin) => admin.id !== adminId)
        );
      } catch (err) {
        console.error('Error deleting admin:', err);
        alert('Failed to delete admin. Please try again.');
      }
    }
  };

  return (
    <div className="mx-auto flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white">
        {/* Top section */}
        <div className="border-b border-gray-200 p-4">
          <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
        </div>

        {/* Nav Links */}
        <nav className="space-y-2 px-4 py-6">
          {/*Student Highlights*/}
          <div>
            <button
              onClick={() =>
                setOpenDropdown(
                  openDropdown === 'studenthighlights'
                    ? null
                    : 'studenthighlights'
                )
              }
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-gray-700 transition-all hover:bg-gray-100"
            >
              <i className="fas fa-folder"></i> Student Highlights
              <span className="ml-auto">
                {/* Dropdown Arrow */}
                <svg
                  className={`h-4 w-4 transition-transform ${openDropdown === 'studenthighlights' ? 'rotate-180' : ''}`}
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
            {/* Dropdown Menu */}
            {openDropdown === 'studenthighlights' && (
              <div className="ml-6 mt-1 space-y-1">
                <button
                  onClick={() => {
                    handleSelect('cur-student-highlights');
                  }}
                  className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-all ${
                    activeCategory === 'cur-student-highlights'
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Student Highlights
                </button>
                <button
                  onClick={() => {
                    handleSelect('student-highlights');
                  }}
                  className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-all ${
                    activeCategory === 'student-highlights'
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Pending Student Highlights
                </button>
              </div>
            )}
          </div>

          {/*Tech Blog*/}
          <div>
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === 'techblog' ? null : 'techblog')
              }
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-gray-700 transition-all hover:bg-gray-100"
            >
              <i className="fas fa-folder"></i> Technology Blog
              <span className="ml-auto">
                {/* Dropdown Arrow */}
                <svg
                  className={`h-4 w-4 transition-transform ${openDropdown === 'techblog' ? 'rotate-180' : ''}`}
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
            {/* Dropdown Menu */}
            {openDropdown === 'techblog' && (
              <div className="ml-6 mt-1 space-y-1">
                <button
                  onClick={() => {
                    handleSelect('cur-tech-blog');
                  }}
                  className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-all ${
                    activeCategory === 'cur-tech-blog'
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Technology Blog
                </button>
                <button
                  onClick={() => {
                    handleSelect('tech-blog');
                  }}
                  className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-all ${
                    activeCategory === 'tech-blog'
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Pending Technology Blog
                </button>
              </div>
            )}
          </div>

          {/*Events */}
          <div>
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === 'events' ? null : 'events')
              }
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-gray-700 transition-all hover:bg-gray-100"
            >
              <i className="fas fa-folder"></i> Events
              <span className="ml-auto">
                {/* Dropdown Arrow */}
                <svg
                  className={`h-4 w-4 transition-transform ${openDropdown === 'events' ? 'rotate-180' : ''}`}
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
            {/* Dropdown Menu */}
            {openDropdown === 'events' && (
              <div className="ml-6 mt-1 space-y-1">
                <button
                  onClick={() => {
                    handleSelect('events');
                  }}
                  className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-all ${
                    activeCategory === 'events'
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Events
                </button>
                <button
                  onClick={() => {
                    handleSelect('events');
                  }}
                  className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-all ${
                    activeCategory === 'events'
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Pending Events
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => handleSelect('faq')}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-all ${
              activeCategory === 'faq'
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <i className="fas fa-chart-line"></i> FAQs
          </button>

          <button
            onClick={() => handleSelect('faculty-directory')}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-all ${
              activeCategory === 'faculty-directory'
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <i className="fas fa-chart-line"></i> Faculty Directory
          </button>
          <button
            onClick={() => handleSelect('student-resources')}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-all ${
              activeCategory === 'student-resources'
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <i className="fas fa-chart-line"></i> Student Resources
          </button>
          <button
            onClick={() => handleSelect('pending-accounts')}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-all ${
              activeCategory === 'pending-accounts'
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <i className="fas fa-chart-line"></i> Pending Accounts
          </button>

          <button
            onClick={() => handleSelect('user-controls')}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-all ${
              activeCategory === 'pending-accounts'
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <i className="fas fa-chart-line"></i> User Controls
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-auto p-6">
        {/* Pending Student Highlights Section */}
        {activeCategory === 'student-highlights' && <PendingHighlights />}

        {/* Technology Blog Section */}
        {activeCategory === 'tech-blog' && <PendingArticles />}

        {/* Events Section */}
        {activeCategory === 'events' && (
          <div className="space-y-4 p-3">
            <h3 className="mb-2 text-lg font-medium text-stone-800">
              Events Page - Coming Soon
            </h3>
          </div>
        )}
        {/* Faqs section */}
        {activeCategory === 'faq' && <FAQSection />}

        {/* Faculty directory section */}
        {activeCategory === 'faculty-directory' && <FacultySection />}

        {/* Student Resources section */}
        {activeCategory === 'student-resources' && <StudentResourceSection />}

        {/* Current Student Highlights section */}
        {activeCategory === 'cur-student-highlights' && <HighlightsSection />}

        {/* Current Tech Blog section */}
        {activeCategory === 'cur-tech-blog' && <TechBlogSection />}
        {/* Pending Accounts Section */}
        {activeCategory === 'pending-accounts' && <PendingAccountsSection />}

        {activeCategory === 'user-controls' && (
          <UserControlsSection admins={admins} handleDelete={handleDelete} />
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
        <Link
          to="/admin-panel/users/create-user"
          className="hover:bg-4lue-600 rounded bg-blue-300 px-4 py-2 text-white"
        >
          Add User
        </Link>
      </div>*/}
    </div>
  );
}
