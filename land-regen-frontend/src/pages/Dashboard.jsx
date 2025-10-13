import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import AddTree from "./AddTree";
import Map from "./Map";

export default function Dashboard() {
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    const fetchTrees = async () => {
      const { data, error } = await supabase.from("trees").select("*");
      if (error) {
        console.error("Error fetching trees:", error);
      } else {
        setTrees(data);
      }
    };

    fetchTrees();
  }, []);

  return (
    <div className="dashboard">
      <header className="header">
        <h1>🌍 Land Regen Dashboard</h1>
        <p>Encouraging Tree Planting for a Greener Future</p>
      </header>

      <section className="add-tree-section">
        <h2>Plant a Tree</h2>
        <AddTree />
      </section>

      <section className="map-section">
        <h2>Tree Map</h2>
        <Map trees={trees} />
      </section>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Land Regen | Building a Green Future 🌱
        </p>
      </footer>
    </div>
  );
}
