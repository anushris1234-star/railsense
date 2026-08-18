import { useState } from "react";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";

function WhatIfSimulator({ prediction, ticketData }) {
  const [selectedDate, setSelectedDate] = useState("2026-09-15");
  const [probability, setProbability] = useState(
  prediction?.confirmation_percentage ?? 0
);

  const handleSimulation = (e) => {
    const date = e.target.value;
    setSelectedDate(date);

    // Temporary mock behaviour.
    // This will later be replaced by the /simulate API.
    if (date === "2026-09-14") {
      setProbability(91);
    } else if (date === "2026-09-16") {
      setProbability(72);
    } else {
      setProbability(78);
    }
  };

  const currentProbability = prediction?.confirmation_percentage ?? 0;
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
    {ticketData?.journey_date || "15 Sep 2026"}
  </strong>
  <span>WL {ticketData?.current_wl}</span>
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

          <label htmlFor="simulation-date">Journey date</label>

          <select
            id="simulation-date"
            value={selectedDate}
            onChange={handleSimulation}
          >
            <option value="2026-09-14">14 Sep 2026</option>
            <option value="2026-09-15">15 Sep 2026</option>
            <option value="2026-09-16">16 Sep 2026</option>
          </select>
        </div>

        <div className="simulation-result">
          <p className="card-label">NEW ESTIMATE</p>

          <div className="new-probability">
            <strong>{probability}%</strong>

            {improvement > 0 && (
              <span>
                <TrendingUp size={15} />
                +{improvement}%
              </span>
            )}
          </div>

          <p>
            {improvement > 0
              ? "This option gives you a better estimated chance of confirmation."
              : improvement < 0
              ? "This option gives you a lower estimated chance of confirmation."
              : "This is your current estimated probability."}
          </p>
        </div>
      </div>

      {improvement > 0 && (
        <div className="whatif-recommendation">
          <div>
            <strong>Better option detected</strong>

            <p>
              Travelling on {selectedDate.split("-").reverse().join(" ")} is
              estimated to improve your confirmation probability by{" "}
              <strong>{improvement} percentage points.</strong>
            </p>
          </div>

          <span className="recommendation-badge">Recommended</span>
        </div>
      )}
    </section>
  );
}

export default WhatIfSimulator;