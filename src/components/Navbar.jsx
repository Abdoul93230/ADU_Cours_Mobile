import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

function Navbar({ onMenuClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuClick?.();
  };

  return (
    <nav className="bg-indigo-600 text-white fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              className="mr-4 md:hidden"
              onClick={handleMenuClick}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <Link to="/" className="text-lg md:text-xl font-bold whitespace-nowrap">
              Formation React Native - ADU
            </Link>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex space-x-6">
            <Link to="/module1" className="hover:text-indigo-200 transition-colors">Module 1</Link>
            <Link to="/module2" className="hover:text-indigo-200 transition-colors">Module 2</Link>
            <Link to="/module3" className="hover:text-indigo-200 transition-colors">Module 3</Link>
          </div>

          {/* Menu burger pour mobile */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-indigo-500">
            <Link
              to="/module1"
              className="block hover:text-indigo-200 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Module 1
            </Link>
            <Link
              to="/module2"
              className="block hover:text-indigo-200 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Module 2
            </Link>
            <Link
              to="/module3"
              className="block hover:text-indigo-200 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Module 3
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
