import { Link } from 'react-router-dom';
import { BookOpenIcon, AcademicCapIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md h-screen">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Modules du Cours</h2>
        <nav className="space-y-2">
          <Link 
            to="/module1" 
            className="flex items-center p-2 text-gray-700 hover:bg-indigo-50 rounded-lg"
          >
            <BookOpenIcon className="h-5 w-5 mr-2" />
            <span>Module 1: Fondamentaux</span>
          </Link>
          <Link 
            to="/module2" 
            className="flex items-center p-2 text-gray-700 hover:bg-indigo-50 rounded-lg"
          >
            <AcademicCapIcon className="h-5 w-5 mr-2" />
            <span>Module 2: Navigation</span>
          </Link>
          <Link 
            to="/module3" 
            className="flex items-center p-2 text-gray-700 hover:bg-indigo-50 rounded-lg"
          >
            <RocketLaunchIcon className="h-5 w-5 mr-2" />
            <span>Module 3: Finalisation</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;