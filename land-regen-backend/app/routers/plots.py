from fastapi import APIRouter
from app.services.supabase_client import supabase

router = APIRouter()

@router.get("/")
def get_all_plots():
    response = supabase.table("plots").select("*").execute()
    return response.data

@router.post("/")
def create_plot(owner: str, name: str, area_ha: float, soil_type: str):
    response = supabase.table("plots").insert({
        "owner": owner,
        "name": name,
        "area_ha": area_ha,
        "soil_type": soil_type
    }).execute()
    return {"status": "success", "data": response.data}
