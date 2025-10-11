from fastapi import APIRouter
from app.services.supabase_client import supabase
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class TreeIn(BaseModel):
    plot_id: str
    owner: str
    species: str
    date_planted: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    height_m: Optional[float] = None
    status: Optional[str] = "seedling"

@router.get("/")
def get_trees():
    res = supabase.table("trees").select("*").execute()
    return res.data

@router.post("/")
def add_tree(tree: TreeIn):
    res = supabase.table("trees").insert(tree.dict()).execute()
    return {"status": "success", "data": res.data}

@router.put("/{tree_id}")
def update_tree(tree_id: str, height_m: Optional[float] = None, status: Optional[str] = None):
    updates = {}
    if height_m is not None:
        updates["height_m"] = height_m
    if status is not None:
        updates["status"] = status
    res = supabase.table("trees").update(updates).eq("id", tree_id).execute()
    return {"status": "updated", "data": res.data}
