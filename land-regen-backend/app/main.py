from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
import os

# === Environment Config ===
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

# === CORS (allow frontend requests) ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For local dev — restrict to frontend URL later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Models ===
class Tree(BaseModel):
    species: str
    latitude: float
    longitude: float
    planted_by: str
    adopted: bool = False

class AdoptTree(BaseModel):
    adopter_name: str

# === Routes ===

@app.get("/")
def root():
    return {"message": "Land Regen backend running successfully"}

@app.get("/trees")
def get_trees():
    data = supabase.table("trees").select("*").execute()
    return data.data

@app.post("/trees")
def add_tree(tree: Tree):
    data = supabase.table("trees").insert(tree.dict()).execute()
    return {"message": "Tree added successfully", "data": data.data}

@app.patch("/trees/{tree_id}/adopt")
def adopt_tree(tree_id: int, payload: AdoptTree):
    data = supabase.table("trees").update({
        "adopted": True,
        "adopter_name": payload.adopter_name
    }).eq("id", tree_id).execute()

    if not data.data:
        raise HTTPException(status_code=404, detail="Tree not found")

    return {"message": "Tree adopted successfully", "data": data.data}
