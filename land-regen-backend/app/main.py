from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv
from pathlib import Path
import os

# ============================================================
# 🔹 1. Load environment variables from .env
# ============================================================
env_path = Path(__file__).resolve().parent.parent / ".env"

if load_dotenv(dotenv_path=env_path):
    print("✅ .env file loaded successfully.")
else:
    print(f"⚠️ Could not load .env file at: {env_path}")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("❌ Missing Supabase credentials. Please check .env or Render environment variables.")
else:
    print("✅ Supabase credentials loaded successfully!")

# ============================================================
# 🔹 2. Initialize Supabase client
# ============================================================
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ============================================================
# 🔹 3. Initialize FastAPI app
# ============================================================
app = FastAPI(title="Land Regen API", version="1.0")

# ============================================================
# 🔹 4. CORS setup — allow frontend to connect
# ============================================================
origins = [
    "http://localhost:5173",  # Vite local
    "http://127.0.0.1:5173",
    "https://land-regen.netlify.app",  # your Netlify frontend (update if different)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================
# 🔹 5. Sample routes
# ============================================================

@app.get("/")
def read_root():
    return {"message": "🌱 Land Regen API is running successfully!"}


@app.get("/test_supabase")
def test_supabase():
    """Simple route to test your Supabase connection"""
    try:
        data = supabase.table("profiles").select("*").limit(1).execute()
        return {"message": "✅ Supabase connection OK", "data": data.data}
    except Exception as e:
        return {"error": str(e)}

# ============================================================
# 🔹 6. Run with:
# uvicorn app.main:app --reload
# ============================================================
