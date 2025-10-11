from fastapi import FastAPI
from app.routers import plots, trees, tokens

app = FastAPI(
    title="Land ReGen Backend",
    description="API backend for Land ReGen Hackathon project",
    version="1.0.0",
)

# Routers
app.include_router(plots.router, prefix="/plots", tags=["Plots"])
app.include_router(trees.router, prefix="/trees", tags=["Trees"])
app.include_router(tokens.router, prefix="/tokens", tags=["Tokens"])

@app.get("/")
def root():
    return {"message": "Welcome to the Land ReGen API"}
