import { useState } from "react";
import axios from "axios";

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

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "600px" }}>
      <h1>🚦 RoadShield AI</h1>
      <h3>Road Risk Prediction System</h3>

      <br />

      <label>City</label>
      <br />
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

      <br />
      <br />

      <label>Weather</label>
      <br />
      <select
        name="weather"
        value={formData.weather}
        onChange={handleChange}
      >
        <option>clear</option>
        <option>fog</option>
        <option>rain</option>
      </select>

      <br />
      <br />

      <label>Road Type</label>
      <br />
      <select
        name="road_type"
        value={formData.road_type}
        onChange={handleChange}
      >
        <option>urban</option>
        <option>highway</option>
        <option>rural</option>
      </select>

      <br />
      <br />

      <label>Traffic Density</label>
      <br />
      <select
        name="traffic_density"
        value={formData.traffic_density}
        onChange={handleChange}
      >
        <option>high</option>
        <option>medium</option>
        <option>low</option>
      </select>

      <br />
      <br />

      <label>Hour</label>
      <br />
      <input
        type="number"
        name="hour"
        value={formData.hour}
        onChange={handleChange}
      />

      <br />
      <br />

      <label>Visibility</label>
      <br />
      <input
        type="number"
        name="visibility"
        value={formData.visibility}
        onChange={handleChange}
      />

      <br />
      <br />

      <label>Temperature</label>
      <br />
      <input
        type="number"
        name="temperature"
        value={formData.temperature}
        onChange={handleChange}
      />

      <br />
      <br />

      <label>Lanes</label>
      <br />
      <input
        type="number"
        name="lanes"
        value={formData.lanes}
        onChange={handleChange}
      />

      <br />
      <br />

      <label>Vehicles Involved</label>
      <br />
      <input
        type="number"
        name="vehicles_involved"
        value={formData.vehicles_involved}
        onChange={handleChange}
      />

      <br />
      <br />

      <button onClick={predictRisk}>
        {loading ? "Predicting..." : "Predict Risk"}
      </button>

      {result && (
        <div
          style={{
            marginTop: "30px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <h2>Prediction Result</h2>

          <p>
            <strong>Risk Score:</strong> {result.risk_score}
          </p>

          <p>
            <strong>Risk Level:</strong> {result.risk_level}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;