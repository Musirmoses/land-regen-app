import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddTree from "./pages/AddTree";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-tree" element={<AddTree />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
