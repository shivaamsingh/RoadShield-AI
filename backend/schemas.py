from pydantic import BaseModel

class RiskInput(BaseModel):
    city: int
    hour: int
    day_of_week: int
    is_weekend: int
    road_type: int
    lanes: int
    traffic_signal: int
    weather: int
    visibility: float
    temperature: float
    traffic_density: int
    vehicles_involved: int
    is_peak_hour: int