import { useState } from "react";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { simulateTicket } from "../api/prediction";
const formatDate = (date) => {
  if (!date) return "";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function WhatIfSimulator({ prediction, ticketData }) {
  const currentProbability = prediction?.confirmation_percentage ?? 0;
  const currentDate = ticketData?.journey_date;

const simulationDates = currentDate
  ? [-1, 0, 1].map((offset) => {
      const date = new Date(`${currentDate}T00:00:00`);
      date.setDate(date.getDate() + offset);

      return date.toISOString().split("T")[0];
    })
  : [];

  const [selectedDate, setSelectedDate] = useState(
    ticketData?.journey_date || "2026-09-15"
  );

  const [probability, setProbability] = useState(currentProbability);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSimulation = async (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setLoading(true);
    setError("");

    try {
      const selectedJourney = new Date(`${date}T00:00:00`);

      const today = new Date();
      const millisecondsPerDay = 1000 * 60 * 60 * 24;

      const daysToJourney = Math.max(
        0,
        Math.ceil(
          (selectedJourney - today) / millisecondsPerDay
        )
      );

      const dayOfWeek = selectedJourney.getDay();

      const isWeekend =
        dayOfWeek === 0 || dayOfWeek === 6 ? 1 : 0;

      const result = await simulateTicket(
        ticketData,
        {
          days_to_journey: daysToJourney,
          day_of_week: dayOfWeek,
          is_weekend: isWeekend,
        }
      );

      setProbability(
        Number(
          (result.new_probability * 100).toFixed(2)
        )
      );
    } catch (err) {
      console.error(err);
      setError("Unable to simulate this journey date.");
    } finally {
      setLoading(false);
    }
  };

  const improvement = probability - currentProbability;

  return (
    <section className="whatif-section">
      <div className="whatif-header">
        <div>
          <p className="section-label">DECISION SIMULATOR</p>

          <h2>What if you changed your journey?</h2>

          <p>
            Explore how a different travel date could affect your estimated
            confirmation probability.
          </p>
        </div>

        <div className="simulation-icon">
          <Sparkles size={20} />
        </div>
      </div>

      <div className="whatif-content">
        <div className="current-option">
          <p className="card-label">CURRENT TICKET</p>

          <div className="current-date">
            <strong>
  {formatDate(ticketData?.journey_date)}
</strong>

            <span>
              WL {ticketData?.current_wl}
            </span>
          </div>

          <div className="current-probability">
            <strong>{currentProbability}%</strong>
            <span>confirmation probability</span>
          </div>
        </div>

        <div className="whatif-arrow">
          <ArrowRight size={22} />
        </div>

        <div className="simulation-option">
          <p className="card-label">TRY ANOTHER DATE</p>

          <label htmlFor="simulation-date">
            Journey date
          </label>

          <select
            id="simulation-date"
            value={selectedDate}
            onChange={handleSimulation}
            disabled={loading}
          >
            {simulationDates.map((date) => (
  <option key={date} value={date}>
    {formatDate(date)}
  </option>
))}
          </select>
        </div>

        <div className="simulation-result">
          <p className="card-label">NEW ESTIMATE</p>

          <div className="new-probability">
            <strong>
              {loading ? "..." : `${probability}%`}
            </strong>

            {!loading && improvement > 0 && (
              <span>
                <TrendingUp size={15} />
                +{improvement.toFixed(2)}%
              </span>
            )}
          </div>

          {error ? (
            <p>{error}</p>
          ) : (
            <p>
              {loading
                ? "Running prediction model..."
                : improvement > 0
                ? "This option gives you a better estimated chance of confirmation."
                : improvement < 0
                ? "This option gives you a lower estimated chance of confirmation."
                : "This is your current estimated probability."}
            </p>
          )}
        </div>
      </div>

      {!loading && improvement > 0 && (
        <div className="whatif-recommendation">
          <div>
            <strong>Better option detected</strong>

            <p>
              Travelling on{" "}
              {selectedDate.split("-").reverse().join(" ")}{" "}
              is estimated to improve your confirmation
              probability by{" "}
              <strong>
                {improvement.toFixed(2)} percentage points.
              </strong>
            </p>
          </div>

          <span className="recommendation-badge">
            Recommended
          </span>
        </div>
      )}
    </section>
  );
}

export default WhatIfSimulator;