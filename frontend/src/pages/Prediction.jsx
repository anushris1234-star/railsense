import { CheckCircle2, TrendingUp, AlertCircle } from "lucide-react";
import WLChart from "../components/WLChart";
import WhatIfSimulator from "../components/WhatIfSimulator";
import RailwayTrack from "../components/RailwayTrack";

function Prediction({ onAlternatives }) {
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
          <strong>12952</strong>
          <span>Delhi → Mumbai</span>
          <span>3A · WL 27</span>
        </div>
      </div>

      <section className="prediction-grid">
        <div className="probability-card">
          <div className="card-top">
            <div>
              <p className="card-label">CONFIRMATION PROBABILITY</p>
              <h2>78%</h2>
            </div>

            <div className="status-badge">
              <CheckCircle2 size={16} />
              Good chance
            </div>
          </div>

          <div className="probability-bar">
            <div className="probability-fill"></div>
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
      <RailwayTrack />
<WLChart />



      <section className="factors-section">
        <div className="section-heading">
          <div>
            <p className="section-label">EXPLAINABLE AI</p>
            <h2>Why this prediction?</h2>
          </div>

          <span className="confidence-label">
            <CheckCircle2 size={15} />
            High confidence
          </span>
        </div>

        <div className="factors-list">
          <div className="factor">
            <div>
              <strong>Historical cancellation rate</strong>
              <p>Similar journeys show relatively high cancellations.</p>
            </div>

            <span className="factor-positive">Positive</span>
          </div>

          <div className="factor">
            <div>
              <strong>Days remaining</strong>
              <p>There is sufficient time for your waitlist to move.</p>
            </div>

            <span className="factor-positive">Positive</span>
          </div>

          <div className="factor">
            <div>
              <strong>Current WL position</strong>
              <p>WL 27 introduces some uncertainty.</p>
            </div>

            <span className="factor-negative">Negative</span>
          </div>

          <div className="factor">
            <div>
              <strong>Weekend demand</strong>
              <p>Demand is slightly higher around your journey date.</p>
            </div>

            <span className="factor-negative">Negative</span>
          </div>
        </div>
      </section>
      <WhatIfSimulator />

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