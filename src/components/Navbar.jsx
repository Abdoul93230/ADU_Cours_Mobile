import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Formation React Native - ADU
        </Link>
        <div className="space-x-4">
          <Link to="/module1" className="hover:text-indigo-200">Module 1</Link>
          <Link to="/module2" className="hover:text-indigo-200">Module 2</Link>
          <Link to="/module3" className="hover:text-indigo-200">Module 3</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
