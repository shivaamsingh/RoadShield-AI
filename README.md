# RoadShield AI

AI-powered Road Risk Prediction and Hotspot Detection System for Indian Roads.

## Overview

RoadShield AI is a machine learning-based road safety platform that analyzes accident-related factors such as weather conditions, traffic density, visibility, road type, and peak-hour traffic to estimate road risk levels and identify accident hotspots.

The project aims to support road safety analysis, smart city planning, and accident prevention through predictive analytics and geospatial insights.

---

## Features

* Road Risk Score Prediction using Machine Learning
* Accident Hotspot Detection using Clustering
* Exploratory Data Analysis (EDA)
* Feature Importance Analysis
* Interactive Geospatial Visualization
* FastAPI Backend (In Progress)
* React Dashboard (Planned)

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

Model: Random Forest Regressor

Performance:

* R² Score: 0.88
* Mean Absolute Error (MAE): 0.056

### Most Important Features

| Feature         | Importance |
| --------------- | ---------- |
| Visibility      | 30.4%      |
| Traffic Density | 28.2%      |
| Weather         | 23.1%      |
| Peak Hour       | 8.0%       |
| Temperature     | 2.2%       |

---

## Project Structure

RoadShield-AI/

├── backend/

├── frontend/

├── data/

├── docs/

├── models/

├── notebooks/

│   ├── EDA.ipynb

│   ├── risk_model.ipynb

│   └── hotspot_detection.ipynb

├── screenshots/

├── README.md

└── requirements.txt

---

## Project Status

✅ Data Collection

✅ Exploratory Data Analysis

✅ Risk Prediction Model

✅ Hotspot Detection

🔄 FastAPI Backend

🔄 React Dashboard

🔄 Deployment

---

## Future Improvements

* Real-time weather integration
* Live traffic APIs
* Interactive dashboard
* City-wise risk analysis
* Real-time route risk prediction
* Cloud deployment

---

## Tech Stack

* Python
* Pandas
* NumPy
* Scikit-learn
* Jupyter Notebook
* Folium
* FastAPI
* React (Planned)

---

## Author

Shivam Singh

B.Tech CSE (AI & ML)
