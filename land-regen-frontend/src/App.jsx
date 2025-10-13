import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddTree from "./pages/AddTree";
import Adopt from "./pages/Adopt";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plant" element={<AddTree />} />
        <Route path="/adopt" element={<Adopt />} />
      </Routes>
    </Router>
  );
}

export default App;
