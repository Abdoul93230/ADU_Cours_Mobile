import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Module1 from './pages/Module1';
import Module2 from './pages/Module2';
import Module3 from './pages/Module3';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex pt-16">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <main className="flex-1 p-4 md:p-8 md:ml-64">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/module1" element={<Module1 />} />
              <Route path="/module2" element={<Module2 />} />
              <Route path="/module3" element={<Module3 />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
