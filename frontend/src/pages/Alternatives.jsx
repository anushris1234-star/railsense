import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Star,
  TrainFront,
  TrendingUp,
} from "lucide-react";

import { getAlternatives } from "../api/prediction";

function Alternatives({ onBack, ticketData }) {
  const [alternatives, setAlternatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAlternatives = async () => {
      if (!ticketData) return;

      setLoading(true);
      setError("");

      try {
        const result = await getAlternatives(ticketData);

        setAlternatives(result.alternatives || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load alternatives.");
      } finally {
        setLoading(false);
      }
    };

    loadAlternatives();
  }, [ticketData]);

  return (
    <main className="alternatives-page">
      <div className="alternatives-container">

        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={17} />
          Back to prediction
        </button>

        <div className="alternatives-header">
          <div>
            <p className="section-label">SMART RECOMMENDATIONS</p>

            <h1>Choose the option that works best for you.</h1>

            <p>
              We compare confirmation probability to help you explore
              alternative options for your journey.
            </p>
          </div>
        </div>

        {loading && (
          <div className="recommendation-banner">
            <div className="recommendation-icon">
              <Star size={20} />
            </div>

            <div>
              <p className="banner-label">
                RAILWISE RECOMMENDATION
              </p>

              <h2>Finding better options...</h2>

              <p>
                We are analysing comparable trains using the
                confirmation model.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="recommendation-banner">
            <div>
              <p className="banner-label">UNABLE TO LOAD</p>

              <h2>{error}</h2>

              <p>
                Please make sure the backend is running and try again.
              </p>
            </div>
          </div>
        )}

        {!loading && !error && alternatives.length === 0 && (
          <div className="recommendation-banner">
            <div className="recommendation-icon">
              <Star size={20} />
            </div>

            <div>
              <p className="banner-label">
                SMART RECOMMENDATIONS
              </p>

              <h2>No alternatives available yet.</h2>

              <p>
                There are currently no comparable train options in
                the prototype dataset for this journey.
              </p>
            </div>
          </div>
        )}

        {!loading && !error && alternatives.length > 0 && (
          <>
            <div className="comparison-header">
              <div>
                <p className="section-label">
                  COMPARE OPTIONS
                </p>

                <h2>Available alternatives</h2>
              </div>

              <span>
                {alternatives.length} options analysed
              </span>
            </div>

            <div className="alternatives-list">
              {alternatives.map((option, index) => (
                <div
                  className={`alternative-card ${
                    index === 0
                      ? "recommended-option"
                      : ""
                  }`}
                  key={option.train_id}
                >

                  {index === 0 && (
                    <div className="best-badge">
                      <Star size={13} />
                      Recommended
                    </div>
                  )}

                  <div className="train-info">
                    <div className="train-icon">
                      <TrainFront size={22} />
                    </div>

                    <div>
                      <strong>{option.train_id}</strong>

                      <p>
                        {option.source} →{" "}
                        {option.destination}
                      </p>
                    </div>
                  </div>

                  <div className="alternative-stat">
                    <span>Confirmation</span>

                    <strong className="confirmation-value">
                      {option.confirmation_percentage}%
                    </strong>
                  </div>

                  <div className="alternative-stat">
                    <span>Current WL</span>

                    <strong>
                      WL {option.current_wl}
                    </strong>
                  </div>

                  <div className="alternative-stat">
                    <span>Improvement</span>

                    <strong>
                      {option.improvement > 0
                        ? `+${option.improvement}%`
                        : `${option.improvement}%`}
                    </strong>
                  </div>

                  <div className="option-label">
                    {index === 0
                      ? "Best confirmation chance"
                      : "Alternative option"}
                  </div>
                </div>
              ))}
            </div>

            <div className="decision-note">
              <TrendingUp size={19} />

              <div>
                <strong>How RailWise chooses</strong>

                <p>
                  Alternatives are ranked using the confirmation
                  probability predicted by the same ML model.
                </p>
              </div>
            </div>
          </>
        )}

      </div>
    </main>
  );
}

export default Alternatives;