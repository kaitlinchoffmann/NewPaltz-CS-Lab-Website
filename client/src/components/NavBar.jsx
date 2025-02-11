import { Link } from 'react-router-dom';

/**
 * NavBar Component
 * Main navigation component for the CS Lab website
 * Features:
 * - Responsive layout with flexbox
 * - Dropdown menus for Blogs and Resources
 * - Interactive hover states
 * - Mobile-friendly design
 */


const NavBar = () => {
  return (

    // Main navigation container with flexible layout
    <nav className="flex items-center justify-between bg-stone-50 px-5 py-5">
      {/* CS Lab Logo - Positioned to the left 
          Circular design with hover state */}

      <Link to="/" className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-200 text-xs font-bold text-black">
        CS lab
      </Link>

      {/* Navigation Items - Centered in layout
          Uses rounded container with stone background */}
      <ul className="flex cursor-pointer flex-row gap-5 rounded-full bg-stone-200 px-5 py-2 text-stone-700">
        {/* Standard navigation items with hover effects */}
        <li className="transition-color rounded-xl px-1 py-1 duration-300 hover:bg-rose-300 hover:text-black hover:shadow">
          <Link to="/">Home</Link>
        </li>
         
        <li className="transition-color rounded-xl px-1 py-1 duration-300 hover:bg-rose-300 hover:text-black hover:shadow">
          <Link to="/calendar">Calendar</Link>
        </li>

        {/* Blogs Dropdown Menu
            Uses group hover functionality for showing/hiding dropdown
            Absolute positioning relative to parent li */}
        <li className="group relative rounded-xl px-1 py-1 hover:bg-rose-300 hover:text-black">
          <span className="transition-color cursor-pointer rounded-xl px-1 py-1 text-stone-700 duration-300 hover:bg-rose-300 hover:text-black">
            Blogs
          </span>
          {/* Dropdown container - hidden by default, shown on group hover */}
          <ul className="absolute top-8 flex hidden w-40 cursor-pointer flex-col rounded-lg bg-stone-200 text-center shadow-md group-hover:block">
            <li className="rounded-lg py-1 text-stone-700 transition-colors duration-300 hover:bg-rose-300 hover:text-black">
              <Link to="/student-highlights">Student Highlights</Link>
            </li>
            <li className="transition-color rounded-lg px-1 py-1 text-stone-700 duration-300 hover:bg-rose-300 hover:text-black">
              <Link to="/tech-blog">Tech Blog</Link>
            </li>
          </ul>
        </li>

        {/* Resources Dropdown Menu
            Similar structure to Blogs dropdown
            Contains links to various resource pages */}
        <li className="group relative rounded-xl px-1 py-1 hover:bg-rose-300 hover:text-black">
          <span className="transition-color cursor-pointer rounded-xl px-1 py-1 text-stone-700 duration-300 hover:bg-rose-300 hover:text-black">
            Resources
          </span>
          {/* Resources dropdown container */}
          <ul className="absolute top-8 flex hidden w-40 cursor-pointer flex-col rounded-lg bg-stone-200 text-center shadow-md group-hover:block">
            <li className="rounded-lg py-1 text-stone-700 transition-colors duration-300 hover:bg-rose-300 hover:text-black">
              <Link to="/student-resources">Student Resources</Link>
            </li>
            <li className="transition-color rounded-lg px-1 py-1 text-stone-700 duration-300 hover:bg-rose-300 hover:text-black">
              <Link to="/faculty-directory">Faculty Directory</Link>
            </li>
            <li className="transition-color rounded-lg px-1 py-1 text-stone-700 duration-300 hover:bg-rose-300 hover:text-black">
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </li>
      </ul>

      {/* Login Button - Positioned to the right
          Uses orange highlight color for visibility */}
      <Link to="/login" className="rounded-full bg-orange-300 px-5 py-1 font-medium text-black">
        <p>login</p>
      </Link>
    </nav>
  );
};

export default NavBar;