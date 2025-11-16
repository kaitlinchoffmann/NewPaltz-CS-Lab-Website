import React, { useState, useEffect } from 'react';
import PendingHighlights from '../../components/AdminPanel/PendingHighlights';
import PendingArticles from '../../components/AdminPanel/PendingArticles';
import FAQSection from '../../components/AdminPanel/FAQSection';
import FacultySection from '../../components/AdminPanel/FacultySection';
import StudentResourceSection from '../../components/AdminPanel/StudentResourceSection';
import HighlightsSection from '../../components/AdminPanel/HighlightsSection';
import TechBlogSection from '../../components/AdminPanel/TechBlogSection';
import PendingAccountsSection from '../../components/AdminPanel/PendingAccountsSection';
import UserControlsSection from '../../components/AdminPanel/UserControlsSection';
import { adminService } from '../../services/adminService';
import { Link } from 'react-router-dom';

export default function AdminPanel() {
  const [activeCategory, setActiveCategory] = useState('student-highlights');
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
    if (window.confirm('Are you sure you want to delete this Admin?')) {
      try {
        await adminService.deleteAdmin(adminId);
        setAdmins((prev) => prev.filter((a) => a.id !== adminId));
      } catch (err) {
        alert('Failed to delete admin. Please try again.');
      }
    }
  };

  return (
    <div className="mx-auto flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-4">
          <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
        </div>

        <nav className="space-y-2 px-4 py-6">
          {/* Student Highlights */}
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
            </button>

            {openDropdown === 'studenthighlights' && (
              <div className="ml-6 mt-1 space-y-1">
                <button
                  onClick={() => handleSelect('cur-student-highlights')}
                  className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-all ${
                    activeCategory === 'cur-student-highlights'
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Student Highlights
                </button>

                <button
                  onClick={() => handleSelect('student-highlights')}
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

          {/* Tech Blog */}
          <div>
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === 'techblog' ? null : 'techblog')
              }
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-gray-700 transition-all hover:bg-gray-100"
            >
              <i className="fas fa-folder"></i> Technology Blog
            </button>

            {openDropdown === 'techblog' && (
              <div className="ml-6 mt-1 space-y-1">
                <button
                  onClick={() => handleSelect('cur-tech-blog')}
                  className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-all ${
                    activeCategory === 'cur-tech-blog'
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Technology Blog
                </button>

                <button
                  onClick={() => handleSelect('tech-blog')}
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

          {/* Events */}
          <div>
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === 'events' ? null : 'events')
              }
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-gray-700 transition-all hover:bg-gray-100"
            >
              <i className="fas fa-folder"></i> Events
            </button>

            {openDropdown === 'events' && (
              <div className="ml-6 mt-1 space-y-1">
                <button
                  onClick={() => handleSelect('events')}
                  className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-all ${
                    activeCategory === 'events'
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Events
                </button>

                <button
                  onClick={() => handleSelect('events')}
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
            FAQs
          </button>

          <button
            onClick={() => handleSelect('faculty-directory')}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-all ${
              activeCategory === 'faculty-directory'
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Faculty Directory
          </button>

          <button
            onClick={() => handleSelect('student-resources')}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-all ${
              activeCategory === 'student-resources'
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Student Resources
          </button>

          <button
            onClick={() => handleSelect('pending-accounts')}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-all ${
              activeCategory === 'pending-accounts'
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Pending Accounts
          </button>

          <button
            onClick={() => handleSelect('user-controls')}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-all ${
              activeCategory === 'user-controls'
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            User Controls
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-x-auto p-6">
        {activeCategory === 'student-highlights' && <PendingHighlights />}
        {activeCategory === 'tech-blog' && <PendingArticles />}
        {activeCategory === 'faq' && <FAQSection />}
        {activeCategory === 'faculty-directory' && <FacultySection />}
        {activeCategory === 'student-resources' && <StudentResourceSection />}
        {activeCategory === 'cur-student-highlights' && <HighlightsSection />}
        {activeCategory === 'cur-tech-blog' && <TechBlogSection />}
        {activeCategory === 'pending-accounts' && <PendingAccountsSection />}
        {activeCategory === 'user-controls' && (
          <UserControlsSection admins={admins} handleDelete={handleDelete} />
        )}

        {activeCategory === 'events' && (
          <div className="space-y-4 p-3">
            <h3 className="mb-2 text-lg font-medium text-stone-800">
              Events Page - Coming Soon
            </h3>

            <div className="mb-6 flex-col items-center justify-between">
              <h1 className="mb-4 text-2xl font-semibold text-stone-700">
                User Controls
              </h1>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-stone-300 bg-white">
                  <thead>
                    <tr>
                      <th className="border-b px-4 py-2">Username</th>
                      <th className="border-b px-4 py-2">Email</th>
                      <th className="border-b px-4 py-2">Role</th>
                      <th className="border-b px-4 py-2">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {admins.map((admin) => (
                      <tr key={admin.id} className="text-center">
                        <td className="border-b px-4 py-2">{admin.user}</td>
                        <td className="border-b px-4 py-2">{admin.email}</td>
                        <td className="border-b px-4 py-2">{admin.role}</td>
                        <td className="border-b px-4 py-2">
                          <Link
                            to={`/admin-panel/users/edit-admin/${admin.id}`}
                            className="mr-2 rounded bg-green-300 px-3 py-1 transition-all duration-300 ease-in hover:bg-green-400"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => handleDelete(admin.id)}
                            className="rounded bg-rose-300 px-3 py-1 transition-all duration-300 ease-in hover:bg-rose-400"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-4">
                  <Link
                    to="/admin-panel/users/create-user"
                    className="rounded bg-blue-300 px-4 py-2 text-white hover:bg-blue-600"
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
