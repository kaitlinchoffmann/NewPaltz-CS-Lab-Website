import { FaGithub } from 'react-icons/fa';
import { CiLocationOn } from 'react-icons/ci';

const Footer = () => {
  return (
    <footer className="bg-stone-50 py-6 text-stone-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          {/* Left Section */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold text-rose-300">
              Computer Science Lab
            </h2>
            <p className="text-sm">
              Your central hub for all things Computer Science!
            </p>
          </div>

          {/* Navigation Links */}
          <div className="mt-4 md:mt-0">
            <ul className="flex flex-wrap gap-4">
              <li>
                <a href="/calendar" className="hover:text-orange-300">
                  Events
                </a>
              </li>
              <li>
                <a href="/faculty" className="hover:text-blue-300">
                  Faculty
                </a>
              </li>
              <li>
                <a href="/student-resources" className="hover:text-violet-300">
                  Student Resources
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-blue-300">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/contributions" className="hover:text-orange-300">
                  Contributions
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="mt-4 flex gap-4 px-4 md:mt-0">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="text-2xl text-violet-300 hover:text-blue-300" />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 flex justify-center border-t border-stone-700 pt-4 text-center text-sm">
          <p className="flex items-center gap-2">
            {' '}
            <CiLocationOn size={20} className="text-sky-300" />
            Located in Science Hall, Room 260
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
