from fastapi import APIRouter
from app.services.supabase_client import supabase

router = APIRouter()

@router.get("/{owner_id}")
def get_tokens(owner_id: str):
    res = supabase.table("green_tokens").select("*").eq("owner", owner_id).execute()
    return res.data

@router.post("/")
def award_token(owner: str, tree_id: str, token_value: float):
    res = supabase.table("green_tokens").insert({
        "owner": owner,
        "tree_id": tree_id,
        "token_value": token_value
    }).execute()
    return {"status": "token_awarded", "data": res.data}
