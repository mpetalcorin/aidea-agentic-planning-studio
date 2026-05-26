from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import List, Optional
from pathlib import Path
import json
from datetime import datetime

app = FastAPI(
    title="aAidea Agentic Planning Studio API",
    description="Backend API for aAidea planning, scoring, scenario simulation, and portfolio recommendations.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = Path(__file__).parent / "data"
DATA_FILE = DATA_DIR / "projects.json"
DATA_DIR.mkdir(exist_ok=True)

DEFAULT_PROJECTS = [
    {
        "name": "GenAI Document Intelligence Studio",
        "category": "AI product",
        "impact": 92,
        "feasibility": 83,
        "budget": 78,
        "stage": "Scale",
    },
    {
        "name": "MitoGatekeeper Systems Studio",
        "category": "Mitochondrial systems biology",
        "impact": 88,
        "feasibility": 72,
        "budget": 62,
        "stage": "Validate",
    },
    {
        "name": "ALT Vulnerability Map",
        "category": "Cancer biology",
        "impact": 84,
        "feasibility": 78,
        "budget": 55,
        "stage": "Package",
    },
]


class Project(BaseModel):
    name: str = Field(..., min_length=1)
    category: str = "AI product"
    impact: int = Field(..., ge=0, le=100)
    feasibility: int = Field(..., ge=0, le=100)
    budget: int = Field(..., ge=0, le=100)
    stage: str = "Explore"


class ScenarioInput(BaseModel):
    funding: int = Field(..., ge=0, le=100)
    team: int = Field(..., ge=0, le=100)
    risk: int = Field(..., ge=0, le=100)
    market: int = Field(..., ge=0, le=100)


class QueryInput(BaseModel):
    query: str


def load_projects() -> List[dict]:
    if not DATA_FILE.exists():
        save_projects(DEFAULT_PROJECTS)
        return DEFAULT_PROJECTS

    try:
        with DATA_FILE.open("r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        save_projects(DEFAULT_PROJECTS)
        return DEFAULT_PROJECTS


def save_projects(projects: List[dict]) -> None:
    with DATA_FILE.open("w", encoding="utf-8") as f:
        json.dump(projects, f, indent=2)


def stage_bonus(stage: str) -> int:
    stage = stage.lower()
    if stage == "scale":
        return 10
    if stage == "package":
        return 8
    if stage == "validate":
        return 6
    return 3


def score_project(project: dict) -> dict:
    readiness = round(
        project["impact"] * 0.4
        + project["feasibility"] * 0.35
        + (100 - project["budget"]) * 0.15
        + stage_bonus(project.get("stage", "Explore"))
    )

    if readiness >= 85:
        action = "Scale now"
        risk_level = "Low to moderate"
    elif readiness >= 70:
        action = "Validate and package"
        risk_level = "Moderate"
    elif readiness >= 55:
        action = "Improve evidence and reduce risk"
        risk_level = "Moderate to high"
    else:
        action = "Pause, simplify, or redesign"
        risk_level = "High"

    return {
        **project,
        "readiness": readiness,
        "recommended_action": action,
        "risk_level": risk_level,
    }


def portfolio_summary(projects: List[dict]) -> dict:
    scored = [score_project(p) for p in projects]
    ranked = sorted(scored, key=lambda x: x["readiness"], reverse=True)

    avg_readiness = round(sum(p["readiness"] for p in scored) / len(scored), 1) if scored else 0
    avg_impact = round(sum(p["impact"] for p in scored) / len(scored), 1) if scored else 0
    avg_feasibility = round(sum(p["feasibility"] for p in scored) / len(scored), 1) if scored else 0

    return {
        "project_count": len(scored),
        "average_readiness": avg_readiness,
        "average_impact": avg_impact,
        "average_feasibility": avg_feasibility,
        "top_project": ranked[0] if ranked else None,
        "ranked_projects": ranked,
    }


@app.get("/")
def root():
    return {
        "status": "online",
        "service": "aAidea Agentic Planning Studio API",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat(),
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "message": "Backend is connected and ready.",
    }


@app.get("/projects")
def get_projects():
    projects = load_projects()
    return {
        "projects": projects,
        "summary": portfolio_summary(projects),
    }


@app.post("/projects")
def add_project(project: Project):
    projects = load_projects()
    projects.append(project.model_dump())
    save_projects(projects)

    return {
        "message": "Project added successfully.",
        "project": score_project(project.model_dump()),
        "summary": portfolio_summary(projects),
    }


@app.post("/projects/save")
def overwrite_projects(projects: List[Project]):
    payload = [p.model_dump() for p in projects]
    save_projects(payload)

    return {
        "message": "Projects saved successfully.",
        "summary": portfolio_summary(payload),
    }


@app.post("/projects/reset")
def reset_projects():
    save_projects(DEFAULT_PROJECTS)
    return {
        "message": "Projects reset to default.",
        "projects": DEFAULT_PROJECTS,
        "summary": portfolio_summary(DEFAULT_PROJECTS),
    }


@app.get("/projects/scored")
def get_scored_projects():
    projects = load_projects()
    return {
        "projects": [score_project(p) for p in projects],
        "summary": portfolio_summary(projects),
    }


@app.post("/scenario")
def simulate_scenario(payload: ScenarioInput):
    score = round(
        payload.funding * 0.3
        + payload.team * 0.25
        + (100 - payload.risk) * 0.25
        + payload.market * 0.2
    )

    if score >= 75:
        recommendation = "Accelerate investment, expand delivery capacity, and prepare a scale-up roadmap."
        posture = "Scale"
    elif score >= 55:
        recommendation = "Proceed with controlled investment, reduce execution risk, and validate assumptions."
        posture = "Validate"
    else:
        recommendation = "Pause major expansion, protect cash, simplify the plan, and focus on critical evidence."
        posture = "Protect"

    return {
        "score": score,
        "posture": posture,
        "recommendation": recommendation,
        "inputs": payload.model_dump(),
    }


@app.post("/recommend")
def recommend(payload: QueryInput):
    query = payload.query.lower()
    projects = portfolio_summary(load_projects())
    top_project = projects.get("top_project", {})

    if "grant" in query or "funding" in query:
        answer = (
            "Recommended funding strategy: package the strongest projects into grant-ready narratives. "
            "Prioritise high-impact, high-feasibility projects with clear deliverables, measurable milestones, "
            "and a credible pathway to adoption."
        )
    elif "cancer" in query or "oncology" in query:
        answer = (
            "Recommended oncology strategy: connect ALT Vulnerability Map, MitoGatekeeper Systems Studio, "
            "and RepairMet Explorer into a coherent cancer systems biology and drug discovery portfolio."
        )
    elif "scale" in query or "first" in query:
        answer = (
            f"Recommended first scale-up: {top_project.get('name', 'the highest-readiness project')}. "
            "This project currently has the strongest combined readiness score based on impact, feasibility, "
            "budget intensity, and development stage."
        )
    elif "risk" in query:
        answer = (
            "Recommended risk action: reduce uncertainty by defining the smallest evidence-generating experiment, "
            "adding governance checkpoints, documenting assumptions, and validating user demand before major investment."
        )
    else:
        answer = (
            "Recommended action: define the decision clearly, rank options by impact, feasibility, budget intensity, "
            "and evidence strength, then run scenario simulations before committing resources."
        )

    return {
        "query": payload.query,
        "answer": answer,
        "portfolio_summary": projects,
    }


@app.get("/export")
def export_dataset():
    projects = load_projects()
    payload = {
        "exported_at": datetime.utcnow().isoformat(),
        "platform": "aAidea Agentic Planning Studio",
        "projects": [score_project(p) for p in projects],
        "summary": portfolio_summary(projects),
    }

    return JSONResponse(payload)
