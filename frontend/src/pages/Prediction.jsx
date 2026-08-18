import { CheckCircle2, TrendingUp, AlertCircle } from "lucide-react";
import WLChart from "../components/WLChart";
import WhatIfSimulator from "../components/WhatIfSimulator";

function Prediction({ prediction, ticketData, onAlternatives }) {
  return (
    <main className="prediction-page">
      <div className="prediction-header">
        <div>
          <p className="section-label">TICKET ANALYSIS</p>
          <h1>Your confirmation forecast</h1>
          <p>
            Based on your ticket details and historical booking patterns.
          </p>
        </div>

        <div className="ticket-summary">
  <strong>{ticketData?.train_id}</strong>
  <span>
    {ticketData?.source} → {ticketData?.destination}
  </span>
  <span>
    {ticketData?.travel_class} · WL {ticketData?.current_wl}
  </span>
</div>
      </div>

      <section className="prediction-grid">
        <div className="probability-card">
          <div className="card-top">
            <div>
              <p className="card-label">CONFIRMATION PROBABILITY</p>
              <h2>{prediction.confirmation_percentage}%</h2>
            </div>

            <div className="status-badge">
  <CheckCircle2 size={16} />
  {prediction?.confirmation_percentage >= 75
    ? "Good chance"
    : prediction?.confirmation_percentage >= 50
    ? "Moderate chance"
    : "Low chance"}
</div>
          </div>

          <div className="probability-bar">
  <div
    className="probability-fill"
    style={{
      width: `${prediction?.confirmation_percentage ?? 0}%`,
    }}
  ></div>
</div>

          <p className="prediction-note">
            Your ticket has a strong chance of reaching RAC or confirmation.
          </p>
        </div>

        <div className="status-card">
          <p className="card-label">EXPECTED FINAL STATUS</p>

          <div className="status-main">
            <TrendingUp size={25} />
            <strong>RAC / CNF</strong>
          </div>

          <p>
            Historical movement suggests your waitlist position is likely to
            improve before the journey date.
          </p>
        </div>
      </section>
      
<WLChart />



      <section className="factors-section">
  <div className="section-heading">
    <div>
      <p className="section-label">PREDICTION FACTORS</p>
      <h2>What is influencing your forecast?</h2>
    </div>

    <span className="confidence-label">
      <CheckCircle2 size={15} />
      Model estimate
    </span>
  </div>

  <div className="factors-list">
    <div className="factor">
      <div>
        <strong>Current WL position</strong>
        <p>
          Your ticket is currently at WL {ticketData?.current_wl}.
          {ticketData?.current_wl <= 10
            ? " This is relatively close to the front of the queue."
            : ticketData?.current_wl <= 30
            ? " There is still room for movement before the journey."
            : " A higher waitlist position adds more uncertainty."}
        </p>
      </div>

      <span
        className={
          ticketData?.current_wl <= 10
            ? "factor-positive"
            : "factor-negative"
        }
      >
        {ticketData?.current_wl <= 10 ? "Positive" : "Caution"}
      </span>
    </div>

    <div className="factor">
      <div>
        <strong>Days until journey</strong>
        <p>
          {ticketData?.days_to_journey} days remain before your journey.
          {ticketData?.days_to_journey >= 15
            ? " This gives the waitlist more time to move."
            : " There is less time for significant movement."}
        </p>
      </div>

      <span
        className={
          ticketData?.days_to_journey >= 15
            ? "factor-positive"
            : "factor-negative"
        }
      >
        {ticketData?.days_to_journey >= 15 ? "Positive" : "Caution"}
      </span>
    </div>

    <div className="factor">
      <div>
        <strong>Historical confirmation rate</strong>
        <p>
          Comparable tickets have a historical confirmation rate of{" "}
          {Math.round(
            (ticketData?.historical_confirmation_rate ?? 0) * 100
          )}
          %.
        </p>
      </div>

      <span
        className={
          (ticketData?.historical_confirmation_rate ?? 0) >= 0.7
            ? "factor-positive"
            : "factor-negative"
        }
      >
        {(ticketData?.historical_confirmation_rate ?? 0) >= 0.7
          ? "Positive"
          : "Caution"}
      </span>
    </div>

    <div className="factor">
      <div>
        <strong>Journey timing</strong>
        <p>
          {ticketData?.is_weekend
            ? "Your journey falls on a weekend, when demand can be higher."
            : "Your journey falls on a weekday, which generally has lower demand than weekends."}
        </p>
      </div>

      <span
        className={
          ticketData?.is_weekend
            ? "factor-negative"
            : "factor-positive"
        }
      >
        {ticketData?.is_weekend ? "Caution" : "Positive"}
      </span>
    </div>
  </div>
</section>
      <WhatIfSimulator
  prediction={prediction}
  ticketData={ticketData}
/>

      <section className="next-step-card">
        <div>
          <AlertCircle size={22} />
          <div>
            <strong>Want to explore your options?</strong>
            <p>
              Compare trains based on confirmation probability, fare and travel time.
            </p>
          </div>
        </div>

        <button onClick={onAlternatives}>
  View smart alternatives →
</button>
      </section>
    </main>
  );
}

export default Prediction;