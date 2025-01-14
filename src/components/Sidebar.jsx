import { Link } from 'react-router-dom';
import { BookOpenIcon, AcademicCapIcon, RocketLaunchIcon, XMarkIcon } from '@heroicons/react/24/outline';

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay pour mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <div className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-md
        transform transition-transform duration-300 ease-in-out z-40
        w-64 md:translate-x-0 overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Modules du Cours</h2>
            <button
              className="md:hidden text-gray-500 hover:text-gray-700 transition-colors"
              onClick={onClose}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <nav className="space-y-3">
            <Link
              to="/module1"
              className="flex items-center p-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors"
              onClick={onClose}
            >
              <BookOpenIcon className="h-5 w-5 mr-3 text-indigo-600" />
              <span>Module 1: Fondamentaux</span>
            </Link>
            <Link
              to="/module2"
              className="flex items-center p-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors"
              onClick={onClose}
            >
              <AcademicCapIcon className="h-5 w-5 mr-3 text-indigo-600" />
              <span>Module 2: Navigation</span>
            </Link>
            <Link
              to="/module3"
              className="flex items-center p-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors"
              onClick={onClose}
            >
              <RocketLaunchIcon className="h-5 w-5 mr-3 text-indigo-600" />
              <span>Module 3: Finalisation</span>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
