// src/api.js
const API_BASE = "https://land-regen-backend.onrender.com"; // replace with your actual backend URL

export async function fetchTrees() {
  const res = await fetch(`${API_BASE}/trees`);
  if (!res.ok) throw new Error("Failed to fetch trees");
  return res.json();
}

export async function addTree(tree) {
  const res = await fetch(`${API_BASE}/trees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tree),
  });
  if (!res.ok) throw new Error("Failed to add tree");
  return res.json();
}
