# RoadShield AI

AI-powered Road Risk Prediction and Hotspot Detection System for Indian Roads.

## Overview

RoadShield AI is a machine learning-based road safety platform that analyzes accident-related factors such as weather conditions, traffic density, visibility, road type, temperature, and peak-hour traffic patterns to estimate road risk levels and identify accident hotspots.

The project aims to support road safety analysis, smart city planning, and accident prevention through predictive analytics and geospatial insights.

---
## Key Achievements

- Built and deployed a full-stack AI application using React and FastAPI
- Achieved an R² Score of 0.88 using Random Forest Regression
- Developed and deployed REST APIs on Render
- Built a responsive dashboard with Dark/Light mode support
- Integrated frontend and backend through real-time risk prediction APIs

## Live Demo

### Frontend Application

[Live Demo](https://road-shield-odtoybjiy-shiivamsingh.vercel.app)

### Backend API

[Backend API](https://roadshield-ai.onrender.com)

### API Documentation

[Swagger Docs](https://roadshield-ai.onrender.com/docs)

---

## Features

* Road Risk Score Prediction using Machine Learning
* Accident Hotspot Detection using Clustering
* Exploratory Data Analysis (EDA)
* Feature Importance Analysis
* Interactive Geospatial Visualization
* FastAPI REST API
* React Frontend Dashboard
* Real-Time Risk Prediction
* Public Cloud Deployment (Render + Vercel)
* Swagger API Documentation

---

## Dataset

* Indian Road Accident Dataset (2022–2025)
* 20,000 accident records
* Multiple Indian cities
* Weather, traffic, visibility, road infrastructure, and temporal features
* Risk score information

---

## Machine Learning Results

### Risk Score Prediction

**Model:** Random Forest Regressor

### Performance

* **R² Score:** 0.88
* **Mean Absolute Error (MAE):** 0.056

### Most Important Features

| Feature         | Importance |
| --------------- | ---------- |
| Visibility      | 30.4%      |
| Traffic Density | 28.2%      |
| Weather         | 23.1%      |
| Peak Hour       | 8.0%       |
| Temperature     | 2.2%       |

---

## API Example

### Request

```json
{
  "city": "Delhi",
  "hour": 18,
  "day_of_week": "Monday",
  "is_weekend": 0,
  "road_type": "urban",
  "lanes": 4,
  "traffic_signal": 1,
  "weather": "rain",
  "visibility": 3,
  "temperature": 28,
  "traffic_density": "high",
  "vehicles_involved": 2,
  "is_peak_hour": 1
}
```

### Response

```json
{
  "risk_score": 0.603,
  "risk_level": "Medium"
}
```

---

## Screenshots

### Dashboard (Dark Mode)
![Dark Dashboard](screenshots/prediction_dashboard_dark.png)

### Dashboard (Light Mode)
![Light Dashboard](screenshots/prediction_dashboard_light.png)

### API Documentation
![API Docs](screenshots/api_docs.png)

### Hotspot Detection
![Hotspot Detection](screenshots/hotspot_detection.png)

---

## Project Structure

```text
RoadShield-AI/
│
├── backend/
│   ├── main.py
│   ├── schemas.py
│   ├── encoders.py
│   ├── model_loader.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── data/
│
├── docs/
│
├── models/
│   └── risk_model.pkl
│
├── notebooks/
│   ├── EDA.ipynb
│   ├── risk_model.ipynb
│   └── hotspot_detection.ipynb
│
├── screenshots/
│
├── render.yaml
├── README.md
└── requirements.txt
```

---

## Project Status

✅ Data Collection

✅ Exploratory Data Analysis

✅ Risk Prediction Model

✅ Accident Hotspot Detection

✅ FastAPI Backend

✅ React Frontend Dashboard

✅ Public API Deployment

✅ Swagger API Documentation

✅ Frontend Deployment (Vercel)

🔄 Real-Time Route Risk Prediction

🔄 Weather API Integration

---

## Future Improvements

* Real-time Weather API Integration
* Live Traffic Data Integration
* Route-Level Risk Prediction
* City-Wise Risk Analytics
* GPS-Based Risk Monitoring
* Mobile Application
* Docker Deployment
* CI/CD Pipeline

---

## Tech Stack

### Backend

* Python
* FastAPI
* Uvicorn

### Machine Learning

* Pandas
* NumPy
* Scikit-learn

### Frontend

* React
* Vite
* Axios
* Modern Responsive UI
* Dark / Light Mode

### Visualization

* Folium

### Deployment

* Render
* Vercel

---

## Author

**Shivam Singh**

B.Tech CSE (AI & ML)

GitHub Profile: https://github.com/shivaamsingh

Project Repository: https://github.com/shivaamsingh/RoadShield-AI

---

If you found this project useful, consider giving it a ⭐ on GitHub.
