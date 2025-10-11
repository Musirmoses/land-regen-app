import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddTree from "./pages/AddTree";
import Tokens from "./pages/Tokens";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-green-700 mb-4">
            🌱 Land Regeneration, One Child One Tree
          </h1>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-tree" element={<AddTree />} />
            <Route path="/tokens" element={<Tokens />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
