# 🌍 Land ReGen — Building a Green Future

**Land ReGen** is an interactive web application that encourages tree planting and environmental restoration.  
It uses **React + Leaflet + Supabase** to visualize tree planting data, showcase contributors, and track environmental impact in real time.

> 🌱 *“Plant a tree, adopt the future.”*

---

## 🚀 Live Demo

🔗 **Live Site:** [https://land-regen.netlify.app](https://land-regen.netlify.app)  
🎨 **Canva MVP Presentation:** https://www.canva.com/design/DAG1qFSTM9k/-NelxJ53huNPHk6Hkz_4rw/edit?utm_content=DAG1qFSTM9k&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

---

## 🧭 Project Overview

Land ReGen allows users and organizations to:

- 🌳 **Plant Trees Virtually** – Add trees with species, coordinates, and planter info directly to the map.  
- 📍 **Track Tree Locations** – Each tree record stores precise latitude and longitude for mapping.  
- 🧑‍🌾 **Link Planters to Trees** – Every tree planted is tied to a specific user or team.  
- 🗺️ **View Trees on an Interactive Map** – Powered by **Leaflet**, markers show planted trees dynamically.  
- 💚 **Promote Sustainability** – A call-to-action hero section encourages visitors to plant or adopt a tree.

---

## 🧩 Tech Stack

| Category | Technologies Used |
|-----------|-------------------|
| Frontend | React (Vite), TailwindCSS |
| Mapping | Leaflet.js |
| Backend | Supabase (PostgreSQL, API) |
| Hosting | Netlify |
| Version Control | Git + GitHub |
| Presentation | Canva |

---

## 🧠 Core Features

### 🌿 1. Add Tree Form
Users can add new tree entries directly from the dashboard:
- Species name  
- Latitude & Longitude (auto or manual input)  
- Planted By (organization or campaign)  
- Planter (linked to Supabase user)

Each entry is stored in the **`trees`** table in Supabase.

---

### 🗺️ 2. Dashboard View
Displays:
- Interactive Leaflet map  
- Planted trees by location and species  
- Attribution to individual users (planters)

---

### 🌍 3. Landing Page / Hero Section
Encourages visitors to **Plant**, **Adopt**, or **Donate** toward tree planting initiatives.

Sample tagline:
> “Together we can grow a greener tomorrow.”

---

## 🧰 Folder Structure

land-regen-frontend/
│
├── src/
│ ├── App.jsx
│ ├── main.jsx
│ ├── pages/
│ │ ├── Dashboard.jsx
│ │ ├── AddTree.jsx
│ └── lib/
│ └── supabaseClient.js
│
├── index.html
├── package.json
├── .gitignore
└── README.md




📊 Demo Strategy
Goal:
Showcase how Land ReGen connects communities to environmental action through a visual dashboard.

Demo Flow
Hero Section – Highlight message: “Building a Green Future.”

Add a Tree – Fill the form to plant a tree and see it appear on the map.

Dashboard – Display planted trees by location and planter.

Adopt a Tree – Present this as a future feature (encourage engagement).


🧑‍💻 Author
Moses Odhiambo
📧 musaodhiambo@gmail.com

🪴 Future Enhancements
User authentication with Supabase Auth

Tree growth tracking via satellite data

Leaderboard for top planters

“Adopt a Tree” feature with impact dashboard

Integration with mobile app (React Native)

🏁 License
This project is licensed under the MIT License.
You are free to use and adapt it for educational or environmental purposes.

🌿 Land ReGen — Plant a tree. Adopt a future.
