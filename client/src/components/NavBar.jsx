import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { BsPencil } from 'react-icons/bs';
import { PiFactoryLight } from 'react-icons/pi';
import authService from '../services/authService';
/**
 * NavBar Component
 *
 * Primary navigation component with the following features:
 * - Responsive layout using flexbox
 * - Interactive dropdown menus for Blogs and Resources
 * - Smooth hover transitions and visual feedback
 * - Accessible navigation structure
 * - Consistent branding elements
 *
 * Navigation Structure:
 * - Home
 * - Calendar
 * - Blogs (dropdown)
 *   └─ Student Highlights
 *   └─ Tech Blog
 * - Resources (dropdown)
 *   └─ Student Resources
 *   └─ Faculty Directory
 *   └─ FAQ
 *
 * @component
 */

const NavBar = () => {

  const isAuthenticated = authService.isAuthenticated();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };


  return (
    <nav className="relative z-10 flex items-center justify-between bg-stone-50 px-10 py-5">
      {/* Logo*/}
      <Link
        to="/"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-200 text-xs font-bold text-black"
      >
        CS lab
      </Link>

      {/* Main Navigation Menu
       * - Centered layout with flexible spacing
       * - Semi-transparent background with blur effect
       * - Consistent hover states across items
       */}
      <ul className="flex gap-6 rounded-full bg-stone-200/80 px-6 py-3 shadow-inner backdrop-blur-sm">
        {/* Primary Navigation Items
         * Each item features:
         * - Icon + text combination
         * - Hover feedback with background change
         * - Consistent padding and spacing
         */}
        <Link to="/">
          <li className="transition-color rounded-xl px-1 py-1 duration-300 hover:bg-rose-300 hover:text-black hover:shadow">
            <p className="flex items-center gap-1">
              {' '}
              <AiOutlineHome /> Home
            </p>
          </li>
        </Link>

        <Link to="/calendar">
          <li className="transition-color rounded-xl px-1 py-1 duration-300 hover:bg-rose-300  hover:shadow">
            <p className="flex items-center gap-1">
              <IoCalendarClearOutline /> Calendar
            </p>
          </li>
        </Link>

        {/* Blogs Dropdown
         * - Uses group hover for interaction
         * - Animated entry/exit
         * - Maintains hover state during submenu interaction
         */}
        <li className="group relative rounded-xl px-1 py-1 hover:bg-rose-300 ">
          <span className="transition-color rounded-xl text-stone-700 duration-300 hover:bg-rose-300">
            <p className="flex items-center gap-1 text-black">
              {' '}
              <BsPencil /> Blogs
            </p>
          </span>

          {/* Dropdown container - hidden by default, shown on group hover */}
          <ul className="invisible absolute left-0 mt-2 w-48 scale-95 transform rounded-xl bg-stone-50/90 py-2 opacity-0 shadow-xl backdrop-blur-sm transition-all duration-300 ease-in-out group-hover:visible group-hover:scale-100 group-hover:opacity-100">
            <li>
              <Link
                to="/student-highlights"
                className="block px-4 py-2 transition-colors hover:bg-rose-300/90"
              >
                Student Highlights
              </Link>
            </li>
            <li>
              <Link
                to="/tech-blog"
                className="block px-4 py-2 transition-colors hover:bg-rose-300/90"
              >
                Tech Blog
              </Link>
            </li>
          </ul>
        </li>

        {/* Resources Dropdown
         * - Mirrors Blogs dropdown behavior
         * - Consistent styling with main navigation
         * - Contains frequently accessed resource links
         */}
        <li className="group relative rounded-xl px-1 py-1 hover:bg-rose-300 ">
          <span className="transition-color rounded-xl text-black duration-300 hover:bg-rose-300">
            <p className="flex items-center gap-1 text-black">
              {' '}
              <PiFactoryLight size={20} /> Resources{' '}
            </p>
          </span>

          {/*Drop Down*/}
          <ul className="invisible absolute left-0 mt-2 w-48 scale-95 transform rounded-xl bg-white/90 py-2 opacity-0 shadow-xl backdrop-blur-sm transition-all duration-300 ease-in-out group-hover:visible group-hover:scale-100 group-hover:opacity-100">
            <li>
              <Link
                to="/student-resources"
                className="block px-4 py-2 transition-colors hover:bg-rose-300/90"
              >
                Student Resources
              </Link>
            </li>
            <li>
              <Link
                to="/faculty"
                className="block px-4 py-2 transition-colors hover:bg-rose-300/90"
              >
                Faculty Directory
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="block px-4 py-2 transition-colors hover:bg-rose-300/90"
              >
                FAQ
              </Link>
            </li>
          </ul>
          
        </li>
            {/* Admin Option (Visible only when authenticated) */}
            {isAuthenticated && (
            <Link to="/admin-panel">
              <li className="transition-color rounded-xl px-1 py-1 duration-300 hover:bg-rose-300 hover:text-black hover:shadow">
                <p className="flex items-center gap-1">
                <MdOutlineAdminPanelSettings size = {20} />
                Admin Panel</p>
              </li>
            </Link>
        )}

      </ul>

      {/* Login/Logout
       */}
       {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="rounded-full bg-orange-300 px-7 py-1 font-medium text-stone-700 duration-300 hover:bg-orange-400 hover:text-black"
        >
          <p>Logout</p>
        </button>) : (
          <Link
            to="/admin-login"
            className="rounded-full bg-orange-300 px-7 py-1 font-medium text-stone-700 duration-300 hover:bg-orange-400 hover:text-black"
          >
            <p>Login</p>
          </Link>
        )}
    </nav>
  );
};

export default NavBar;
