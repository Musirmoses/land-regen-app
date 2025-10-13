import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddTree from "./pages/AddTree";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/map" element={<Map />} />
            <Route path="/adopt" element={<Adopt />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-tree" element={<AddTree />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
