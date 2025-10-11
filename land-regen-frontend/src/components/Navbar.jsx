import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-green-700 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">🌳 Land ReGen</h1>
      <div className="space-x-4">
        <Link to="/">Dashboard</Link>
        <Link to="/add-tree">Add Tree</Link>
        <Link to="/tokens">Tokens</Link>
      </div>
    </nav>
  );
}
