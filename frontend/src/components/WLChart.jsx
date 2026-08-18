import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_URL = "http://127.0.0.1:8000";

function WLChart({ ticketData }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovement = async () => {
      if (!ticketData) return;

      setLoading(true);

      try {
        const response = await fetch(`${API_URL}/movement`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source: ticketData.source,
            destination: ticketData.destination,
            travel_class: ticketData.travel_class,
            current_wl: ticketData.current_wl,
            days_to_journey: ticketData.days_to_journey,
          }),
        });

        if (!response.ok) {
          throw new Error("Movement request failed");
        }

        const result = await response.json();

        const formattedData = result.movement
          .map((item) => ({
            day:
              item.days_to_journey === ticketData.days_to_journey
                ? "Booking"
                : `Day ${item.days_to_journey}`,
            wl: Math.round(item.average_wl),
          }))
          .sort((a, b) => {
            if (a.day === "Booking") return -1;
            if (b.day === "Booking") return 1;

            return (
              Number(a.day.replace("Day ", "")) -
              Number(b.day.replace("Day ", ""))
            );
          });

        setData(formattedData);
      } catch (error) {
        console.error(error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadMovement();
  }, [ticketData]);

  if (loading) {
    return (
      <div className="wl-chart-card">
        <p>Loading historical movement...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="wl-chart-card">
        <div className="wl-chart-header">
          <div>
            <p className="section-label">HISTORICAL MOVEMENT</p>
            <h2>How similar tickets moved</h2>
            <p>No comparable historical tickets found.</p>
          </div>
        </div>
      </div>
    );
  }

  const firstWl = data[0]?.wl;
  const lastWl = data[data.length - 1]?.wl;

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
          <strong>
            WL {firstWl} → WL {lastWl}
          </strong>

          <span>Historical movement</span>
        </div>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid
              stroke="#e8ebef"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tick={{
                fill: "#7a8494",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              reversed
              domain={[0, "dataMax + 5"]}
              tick={{
                fill: "#7a8494",
                fontSize: 12,
              }}
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
          Historical waitlist movement for tickets with similar
          route and class.
        </span>
      </div>
    </div>
  );
}

export default WLChart;