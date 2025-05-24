import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMoon, faSun, faTimes } from '@fortawesome/free-solid-svg-icons';
import { redirect } from 'next/navigation';

interface NavbarProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
  scrollToSection: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, toggleMenu, toggleTheme, isDarkMode, scrollToSection }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">
            <span className="cursor-pointer" onClick={() => scrollToSection('hero')}>Taimoor Jabran</span>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer whitespace-nowrap">About</button>
            <button onClick={() => scrollToSection('projects')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer whitespace-nowrap">Projects</button>
            <button onClick={() => scrollToSection('skills')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer whitespace-nowrap">Skills</button>
            <button onClick={() => scrollToSection('experience')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer whitespace-nowrap">Experience</button>
            <button onClick={() => scrollToSection('contact')} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 !rounded-button cursor-pointer whitespace-nowrap">Contact Me</button>
            <button onClick={() => redirect('/user/login')} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 !rounded-button cursor-pointer whitespace-nowrap">Login</button>
            {/* <button onClick={toggleTheme} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
              <FontAwesomeIcon
                icon={isDarkMode ? faSun : faMoon}
                className="mr-2"
              />
            </button> */}
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
              <FontAwesomeIcon
                icon={isMenuOpen ? faTimes : faBars}
                className="text-2xl"
              />
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 shadow-inner">
          <div className="flex flex-col space-y-4">
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2 cursor-pointer whitespace-nowrap">About</button>
            <button onClick={() => scrollToSection('projects')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2 cursor-pointer whitespace-nowrap">Projects</button>
            <button onClick={() => scrollToSection('skills')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2 cursor-pointer whitespace-nowrap">Skills</button>
            <button onClick={() => scrollToSection('experience')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2 cursor-pointer whitespace-nowrap">Experience</button>
            <button onClick={() => scrollToSection('contact')} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 !rounded-button cursor-pointer whitespace-nowrap">Contact Me</button>
            <button onClick={toggleTheme} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2 cursor-pointer">
              <FontAwesomeIcon
                icon={isDarkMode ? faSun : faMoon}
                className="mr-2"
              />
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;