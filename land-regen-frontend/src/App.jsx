import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddTree from "./pages/AddTree";
import Adopt from "./pages/Adopt";
import Dashboard from "./pages/Dashboard";
import Plant from "./pages/Plant";  // New import

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-green-50 text-gray-900">
        {/* Navbar */}
        <nav className="bg-green-700 text-white py-4 px-6 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wide cursor-pointer">
            <Link to="/">🌍 Land Regen</Link>
          </h1>

          <div className="space-x-6">
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/add" className="hover:underline">
              Plant
            </Link>
            <Link to="/adopt" className="hover:underline">
              Adopt
            </Link>
          </div>
        </nav>

        {/* Page content */}
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddTree />} />
            <Route path="/adopt" element={<Adopt />} />
            <Route path="/plant" element={<Plant />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-green-800 text-white text-center py-4 text-sm">
          © {new Date().getFullYear()} Land Regen — Growing together 🌱
        </footer>
      </div>
    </BrowserRouter>
  );
}

