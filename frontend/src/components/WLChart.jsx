import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Booking", wl: 27 },
  { day: "Day 5", wl: 22 },
  { day: "Day 10", wl: 16 },
  { day: "Day 14", wl: 11 },
  { day: "Day 17", wl: 6 },
  { day: "Journey", wl: 2 },
];

function WLChart() {
  return (
    <div className="wl-chart-card">
      <div className="wl-chart-header">
        <div>
          <p className="section-label">HISTORICAL MOVEMENT</p>
          <h2>How similar tickets moved</h2>
          <p>
            Typical waitlist movement for comparable journeys.
          </p>
        </div>

        <div className="movement-summary">
          <strong>WL 27 → WL 2</strong>
          <span>Typical movement</span>
        </div>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid stroke="#e8ebef" vertical={false} />

            <XAxis
              dataKey="day"
              tick={{ fill: "#7a8494", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              reversed
              domain={[0, 30]}
              tick={{ fill: "#7a8494", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="wl"
              stroke="#2864c7"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="movement-note">
        <strong>What this means:</strong>

        <span>
          Similar tickets have historically moved significantly before
          the journey date, supporting the current confirmation forecast.
        </span>
      </div>
    </div>
  );
}

export default WLChart;