from fastapi import FastAPI
from model_loader import model
from schemas import RiskInput

app = FastAPI(
    title="RoadShield AI",
    description="Road Risk Prediction API",
    version="1.0"
)

@app.get("/")
def home():
    return {
        "message": "RoadShield AI API Running"
    }

@app.post("/predict")
def predict(data: RiskInput):

    values = [[
        data.city,
        data.hour,
        data.day_of_week,
        data.is_weekend,
        data.road_type,
        data.lanes,
        data.traffic_signal,
        data.weather,
        data.visibility,
        data.temperature,
        data.traffic_density,
        data.vehicles_involved,
        data.is_peak_hour
    ]]

    prediction = model.predict(values)[0]

    return {
        "risk_score": round(float(prediction), 3)
    }