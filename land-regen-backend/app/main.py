from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv
import os

# === Load environment variables ===
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("❌ Missing Supabase credentials. Please check .env or Render environment variables.")

# === Initialize Supabase client ===
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# === Create FastAPI app ===
app = FastAPI(title="Land Regen Backend")

# === Enable CORS (so frontend can talk to backend) ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict to Netlify domain later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Example route ===
@app.get("/")
def root():
    return {"message": "🌿 Land Regen Backend is running!"}


@app.get("/trees")
def get_trees():
    """Example Supabase call."""
    try:
        data = supabase.table("trees").select("*").execute()
        return {"trees": data.data}
    except Exception as e:
        return {"error": str(e)}
