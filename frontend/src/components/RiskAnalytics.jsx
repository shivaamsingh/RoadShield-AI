import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const cityData = [
  { city: "Delhi", risk: 82 },
  { city: "Mumbai", risk: 65 },
  { city: "Bangalore", risk: 78 },
  { city: "Chennai", risk: 45 },
];

const weatherData = [
  { name: "Rain", value: 40 },
  { name: "Fog", value: 35 },
  { name: "Clear", value: 25 },
];

const COLORS = ["#ef4444", "#f59e0b", "#22c55e"];

export default function RiskAnalytics() {
  return (
    <div className="card" style={{ marginTop: "30px" }}>
      <h2>📊 Risk Analytics Dashboard</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div>
          <div>
  <h3>Risk by City</h3>

  <BarChart
    width={450}
    height={300}
    data={cityData}
  >
    <XAxis dataKey="city" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="risk" fill="#3b82f6" />
  </BarChart>
</div>

<div>
  <h3>Weather Impact</h3>

  <PieChart width={450} height={300}>
    <Pie
      data={weatherData}
      dataKey="value"
      outerRadius={100}
      label
    >
      {weatherData.map((entry, index) => (
        <Cell
          key={index}
          fill={COLORS[index]}
        />
      ))}
    </Pie>

    <Tooltip />
  </PieChart>
</div>
        </div>
      </div>
    </div>
  );
}