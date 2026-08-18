import {
  ArrowLeft,
  Clock3,
  IndianRupee,
  Star,
  TrainFront,
  TrendingUp,
} from "lucide-react";

const alternatives = [
  {
    train: "12954",
    name: "August Kranti Rajdhani",
    departure: "21:30",
    arrival: "15:40",
    duration: "18h 10m",
    fare: "₹1,340",
    probability: 91,
    recommendation: "Best overall",
  },
  {
    train: "12956",
    name: "Golden Express",
    departure: "18:40",
    arrival: "14:30",
    duration: "19h 50m",
    fare: "₹1,180",
    probability: 86,
    recommendation: "Best value",
  },
  {
    train: "12952",
    name: "Current ticket",
    departure: "20:10",
    arrival: "14:30",
    duration: "18h 20m",
    fare: "₹1,250",
    probability: 78,
    recommendation: "Current choice",
  },
];

function Alternatives({ onBack }) {
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
              We compared confirmation probability, fare and travel time to
              find better alternatives for your journey.
            </p>
          </div>
        </div>

        <div className="recommendation-banner">
          <div className="recommendation-icon">
            <Star size={20} />
          </div>

          <div>
            <p className="banner-label">RAILWISE RECOMMENDATION</p>

            <h2>Train 12954 offers the best overall trade-off.</h2>

            <p>
              It increases your estimated confirmation probability by 13
              percentage points with only a small increase in fare and travel
              time.
            </p>
          </div>
        </div>

        <div className="comparison-header">
          <div>
            <p className="section-label">COMPARE OPTIONS</p>
            <h2>Available alternatives</h2>
          </div>

          <span>3 options analysed</span>
        </div>

        <div className="alternatives-list">
          {alternatives.map((option) => (
            <div
              className={`alternative-card ${
                option.recommendation === "Best overall"
                  ? "recommended-option"
                  : ""
              }`}
              key={option.train}
            >
              {option.recommendation === "Best overall" && (
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
                  <strong>{option.train}</strong>
                  <p>{option.name}</p>
                </div>
              </div>

              <div className="journey-time">
                <div>
                  <strong>{option.departure}</strong>
                  <span>Delhi</span>
                </div>

                <div className="journey-line">
                  <div></div>
                  <span>{option.duration}</span>
                  <div></div>
                </div>

                <div>
                  <strong>{option.arrival}</strong>
                  <span>Mumbai</span>
                </div>
              </div>

              <div className="alternative-stat">
                <span>Confirmation</span>

                <strong className="confirmation-value">
                  {option.probability}%
                </strong>
              </div>

              <div className="alternative-stat">
                <span>Fare</span>

                <strong>
                  <IndianRupee size={14} />
                  {option.fare.replace("₹", "")}
                </strong>
              </div>

              <div className="alternative-stat">
                <span>Journey</span>

                <strong>
                  <Clock3 size={14} />
                  {option.duration}
                </strong>
              </div>

              <div className="option-label">
                {option.recommendation}
              </div>
            </div>
          ))}
        </div>

        <div className="decision-note">
          <TrendingUp size={19} />

          <div>
            <strong>How RailWise chooses</strong>

            <p>
              Recommendations balance confirmation probability, fare and
              journey duration instead of simply selecting the train with the
              highest probability.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Alternatives;