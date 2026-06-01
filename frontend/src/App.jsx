import { useState, useEffect } from "react";

import axios from "axios";

import HotspotMap from "./components/HotspotMap";

import "./App.css";

import RiskAnalytics from "./components/RiskAnalytics";

function App() {
  const [formData, setFormData] = useState({
    city: "Delhi",
    hour: 18,
    day_of_week: "Monday",
    is_weekend: 0,
    road_type: "urban",
    lanes: 4,
    traffic_signal: 1,
    weather: "rain",
    visibility: 3,
    temperature: 28,
    traffic_density: "high",
    vehicles_involved: 2,
    is_peak_hour: 1,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);
  }, [darkMode]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const predictRisk = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://roadshield-ai.onrender.com/predict", {
        city: formData.city,
        hour: Number(formData.hour),
        day_of_week: formData.day_of_week,
        is_weekend: Number(formData.is_weekend),
        road_type: formData.road_type,
        lanes: Number(formData.lanes),
        traffic_signal: Number(formData.traffic_signal),
        weather: formData.weather,
        visibility: Number(formData.visibility),
        temperature: Number(formData.temperature),
        traffic_density: formData.traffic_density,
        vehicles_involved: Number(formData.vehicles_involved),
        is_peak_hour: Number(formData.is_peak_hour),
      }
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Prediction Failed");
    } finally {
      setLoading(false);
    }
  };

  const getRiskClass = () => {
    if (!result) return "";

    if (result.risk_level === "Low") return "low";
    if (result.risk_level === "Medium") return "medium";

    return "high";
  };

  return (
    <>
      <div className={`container ${darkMode ? "dark" : "light"}`}>
      <button
        className="theme-toggle-fab"
        onClick={() => setDarkMode(!darkMode)}
        title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <svg
            className="theme-toggle-icon"
            viewBox="0 0 24 24"
            role="img"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            className="theme-toggle-icon"
            viewBox="0 0 24 24"
            role="img"
            aria-hidden="true"
          >
            <path
              d="M20.6 14.6A8 8 0 0 1 9.4 3.4a9 9 0 1 0 11.2 11.2Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      <div className="hero">
        <h1>🚦 RoadShield AI</h1>
        <p>AI-Powered Road Risk Prediction & Safety Analytics</p>

        <a
          href="https://roadshield-ai.onrender.com/docs"
          target="_blank"
          rel="noreferrer"
          className="docs-btn"
        >
          View API Documentation
        </a>
      </div>


      <div className="stats">
        <div className="stat-card">
          <h2>20,000+</h2>
          <p>Accident Records</p>
        </div>

        <div className="stat-card">
          <h2>0.88</h2>
          <p>R² Score</p>
        </div>

        <div className="stat-card">
          <h2>8+</h2>
          <p>Indian Cities</p>
        </div>
      </div>

      <div className="card">
        <div className="grid">
          <div>
            <label>City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
            >
              <option>Delhi</option>
              <option>Mumbai</option>
              <option>Bangalore</option>
              <option>Chennai</option>
              <option>Hyderabad</option>
              <option>Kolkata</option>
              <option>Pune</option>
              <option>Chandigarh</option>
            </select>
          </div>

          <div>
            <label>Weather</label>
            <select
              name="weather"
              value={formData.weather}
              onChange={handleChange}
            >
              <option>clear</option>
              <option>fog</option>
              <option>rain</option>
            </select>
          </div>

          <div>
            <label>Road Type</label>
            <select
              name="road_type"
              value={formData.road_type}
              onChange={handleChange}
            >
              <option>urban</option>
              <option>highway</option>
              <option>rural</option>
            </select>
          </div>

          <div>
            <label>Traffic Density</label>
            <select
              name="traffic_density"
              value={formData.traffic_density}
              onChange={handleChange}
            >
              <option>high</option>
              <option>medium</option>
              <option>low</option>
            </select>
          </div>

          <div>
            <label>Hour</label>
            <input
              type="number"
              name="hour"
              value={formData.hour}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Visibility</label>
            <input
              type="number"
              name="visibility"
              value={formData.visibility}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Temperature</label>
            <input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Lanes</label>
            <input
              type="number"
              name="lanes"
              value={formData.lanes}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Vehicles Involved</label>
            <input
              type="number"
              name="vehicles_involved"
              value={formData.vehicles_involved}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          className="predict-btn"
          onClick={predictRisk}
          disabled={loading}
        >
          {loading ? "Predicting..." : "Predict Risk"}
        </button>

        {result && (
          <div className="result-card">
            <h2>Prediction Result</h2>

            <h3>
              Risk Score: {(result.risk_score * 100).toFixed(1)}%
            </h3>

            <div className="progress">
              <div
                className="progress-fill"
                style={{
                  width: `${result.risk_score * 100}%`,
                }}
              ></div>
            </div>

            <div className={`badge ${getRiskClass()}`}>
              {result.risk_level}
            </div>
          </div>
        )}
      </div>
      <RiskAnalytics />
      <div className="footer">
        Built with React • FastAPI • Scikit-Learn • Render
      </div>
      <div className="card" style={{ marginTop: "30px" }}>
        <h2>🗺️ Accident Hotspot Map</h2>
        <p>
          High-risk accident-prone locations identified using
          clustering analysis.
        </p>

        <HotspotMap />
      </div>
      </div>
    </>
  );
}

export default App;