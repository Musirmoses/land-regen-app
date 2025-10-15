// development default points to local backend; in production set VITE_API_URL
const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
export default API_BASE;
