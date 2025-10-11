import { useEffect, useState } from "react";
import axios from "axios";

export default function Tokens() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/tokens/owner123`)
      .then((res) => setTokens(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Your Green Tokens</h1>
      <ul className="space-y-3">
        {tokens.map((t) => (
          <li key={t.id} className="bg-white p-3 rounded shadow flex justify-between">
            <span>Tree: {t.tree_id}</span>
            <span>{t.token_value} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
