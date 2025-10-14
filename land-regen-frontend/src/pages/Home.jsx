// src/pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <h1 className="text-4xl font-bold mb-6">Land Regen Initiative</h1>
      <div className="flex gap-4">
        <Link to="/map" className="btn btn-outline">View Map</Link>
        <Link to="/plant" className="btn btn-primary">Plant a Tree</Link>
        <Link to="/adopt" className="btn btn-success">Adopt a Tree</Link>
      </div>
    </div>
  );
}
