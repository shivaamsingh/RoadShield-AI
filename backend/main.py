from fastapi import FastAPI
from backend.model_loader import model
from backend.schemas import RiskInput
from fastapi.middleware.cors import CORSMiddleware
from backend.hotspots import hotspots



app = FastAPI(
    title="RoadShield AI",
    description="Road Risk Prediction API",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "RoadShield AI API Running"
    }



@app.post("/predict")
def predict(data: RiskInput):

    values = [[
        CITY_MAP[data.city],
        data.hour,
        DAY_MAP[data.day_of_week],
        data.is_weekend,
        ROAD_MAP[data.road_type],
        data.lanes,
        data.traffic_signal,
        WEATHER_MAP[data.weather],
        data.visibility,
        data.temperature,
        TRAFFIC_MAP[data.traffic_density],
        data.vehicles_involved,
        data.is_peak_hour
    ]]

    risk = float(model.predict(values)[0])

    if risk < 0.4:
        level = "Low"
    elif risk < 0.7:
        level = "Medium"
    else:
        level = "High"

    return {
        "risk_score": round(risk, 3),
        "risk_level": level
    }

from backend.encoders import (
    CITY_MAP,
    DAY_MAP,
    ROAD_MAP,
    WEATHER_MAP,
    TRAFFIC_MAP
)
@app.get("/hotspots")
def get_hotspots():
    return hotspots