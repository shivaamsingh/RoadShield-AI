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
  const [weatherInfo, setWeatherInfo] = useState(null);

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

  const fetchWeather = async () => {
    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

      console.log("API KEY:", apiKey);

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${formData.city},IN&appid=${apiKey}&units=metric`
      );

      const data = response.data;

      let weatherType = "clear";

      if (data.weather[0].main.toLowerCase().includes("rain")) {
        weatherType = "rain";
      } else if (data.weather[0].main.toLowerCase().includes("fog")) {
        weatherType = "fog";
      }

      setFormData((prev) => ({
        ...prev,
        temperature: Math.round(data.main.temp),
        visibility: Math.round((data.visibility || 10000) / 1000),
        weather: weatherType,
      }));
      setWeatherInfo({
        weather: weatherType,
        temperature: Math.round(data.main.temp),
        visibility: Math.round((data.visibility || 10000) / 1000),
      });

      alert(
        `Weather: ${weatherType}
          Temperature: ${Math.round(data.main.temp)}°C
          Visibility: ${Math.round((data.visibility || 10000) / 1000)} km`
      );
    } catch (error) {
      console.error("Weather API Error:", error);
      console.error("Response:", error.response);
      alert("Unable to fetch weather data.");
    }
  };

  const predictRisk = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://roadshield-ai.onrender.com/predict",
        {
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

      console.log("API Response:", response.data);
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
            onClick={fetchWeather}
            style={{ marginBottom: "12px" }}
          >
            🌦️ Auto Fill Weather
          </button>
          {weatherInfo && (
            <div className="result-card" style={{ marginTop: "15px" }}>
              <h3>🌤 Current Weather</h3>

              <p>
                <strong>Weather:</strong> {weatherInfo.weather}
              </p>

              <p>
                <strong>Temperature:</strong> {weatherInfo.temperature}°C
              </p>

              <p>
                <strong>Visibility:</strong> {weatherInfo.visibility} km
              </p>

              <p style={{ color: "#22c55e" }}>
                Updated from OpenWeather API
              </p>
            </div>
          )}
          <button
            className="predict-btn"
            onClick={predictRisk}
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict Risk"}
          </button>

          {result && (
            <div>
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

                <h3
                  style={{
                    marginTop: "20px",
                    textAlign: "left",
                  }}
                >
                  🤖 Why This Risk?
                </h3>

                <p
                  style={{
                    textAlign: "left",
                    lineHeight: "1.8",
                  }}
                >
                  {result.explanation}
                </p>
                <div
                  style={{
                    marginTop: "20px",
                    textAlign: "left",
                  }}
                >
                  <h3>📊 Risk Factor Breakdown</h3>

                  {result.risk_factors && (
                    <ul
                      style={{
                        paddingLeft: "20px",
                        lineHeight: "1.8",
                      }}
                    >
                      <li>👁 Visibility: {result.risk_factors["Visibility"]}</li>
                      <li>🚗 Traffic Density: {result.risk_factors["Traffic Density"]}</li>
                      <li>🌧 Weather: {result.risk_factors["Weather"]}</li>
                      <li>🕒 Peak Hour: {result.risk_factors["Peak Hour"]}</li>
                    </ul>
                  )}
                </div>

                <h3
                  style={{
                    marginTop: "20px",
                    textAlign: "left",
                  }}
                >
                  🤖 AI Safety Recommendations
                </h3>

                <ul
                  style={{
                    marginTop: "10px",
                    paddingLeft: "20px",
                    lineHeight: "1.8",
                  }}
                >
                  {result.recommendations?.map((tip, index) => (
                    <li key={index}>✅ {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <RiskAnalytics />

        <div className="card" style={{ marginTop: "30px" }}>
          <h2>🗺️ Accident Hotspot Map</h2>
          <p>
            High-risk accident-prone locations identified using
            clustering analysis.
          </p>

          <HotspotMap />
        </div>

        <div className="footer">
          Built with React • FastAPI • Scikit-Learn • Render
        </div>
      </div>
    </>
  );
}

export default App;