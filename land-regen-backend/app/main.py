from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
from dotenv import load_dotenv
import os

# === Load environment variables ===
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("❌ Missing Supabase credentials. Please check .env or Render environment variables.")

# === Create Supabase client ===
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# === Initialize FastAPI ===
app = FastAPI(title="Land Regen Backend", version="1.0.0")

# === CORS Settings ===
origins = [
    "http://localhost:5173",  # dev
    "http://127.0.0.1:5173",
    "https://your-netlify-site.netlify.app",  # production
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Data Models ===
class TreeIn(BaseModel):
    species: str
    latitude: float
    longitude: float
    planted_by: str

# === Routes ===
@app.get("/")
def home():
    return {"message": "🌱 Land Regen API is live!"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/trees")
def get_trees():
    try:
        res = supabase.table("trees").select("*").execute()
        return {"data": res.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/trees")
def add_tree(tree: TreeIn):
    try:
        res = supabase.table("trees").insert(tree.dict()).execute()
        return {"data": res.data, "message": "Tree added successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/trees/{tree_id}")
def get_tree(tree_id: int):
    try:
        res = supabase.table("trees").select("*").eq("id", tree_id).execute()
        if not res.data:
            raise HTTPException(status_code=404, detail="Tree not found")
        return {"data": res.data[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
