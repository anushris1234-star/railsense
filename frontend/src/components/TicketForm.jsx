import { ArrowRight } from "lucide-react";

function TicketForm({ onAnalyse, loading }) {

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const source = formData.get("source");
    const destination = formData.get("destination");
    const journeyDate = formData.get("journeyDate");
    const trainId = formData.get("trainId");
    const travelClass = formData.get("travelClass");
    const currentStatus = formData.get("currentStatus");

    // Extract WL number from values such as "WL 27" or "WL27"
    const wlMatch = currentStatus.match(/\d+/);
    const currentWl = wlMatch ? Number(wlMatch[0]) : 0;

    // Calculate days remaining until journey
    const today = new Date();
    const journey = new Date(`${journeyDate}T00:00:00`);

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const daysToJourney = Math.max(
      0,
      Math.ceil((journey - today) / millisecondsPerDay)
    );

    // JavaScript: Sunday = 0, Monday = 1 ... Saturday = 6
    const dayOfWeek = journey.getDay();

    const isWeekend =
      dayOfWeek === 0 || dayOfWeek === 6 ? 1 : 0;

    const payload = {
  train_id: trainId,
  source,
  destination,
  travel_class: travelClass,
  quota: "GN",
  current_wl: currentWl,
  days_to_journey: daysToJourney,
  day_of_week: dayOfWeek,
  is_weekend: isWeekend,
  historical_confirmation_rate: 0.82,
  historical_cancellation_rate: 0.18,
};

onAnalyse({
  ...payload,
  journey_date: journeyDate,
});
  };
  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <div>
          <p className="section-label">TICKET ANALYSIS</p>
          <h2>Check your ticket</h2>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>From</label>
          <select name="source" defaultValue="Delhi">
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Bangalore</option>
            <option>Kolkata</option>
            <option>Chennai</option>
          </select>
        </div>

        <div className="form-group">
          <label>To</label>
          <select name="destination" defaultValue="Mumbai">
            <option>Mumbai</option>
            <option>Delhi</option>
            <option>Bangalore</option>
            <option>Kolkata</option>
            <option>Chennai</option>
          </select>
        </div>

        <div className="form-group">
          <label>Journey date</label>
          <input
            name="journeyDate"
            type="date"
            defaultValue="2026-09-15"
          />
        </div>

        <div className="form-group">
          <label>Train</label>
          <select name="trainId" defaultValue="12952">
            <option value="12952">12952</option>
            <option value="12954">12954</option>
            <option value="12956">12956</option>
          </select>
        </div>

        <div className="form-group">
          <label>Class</label>
          <select name="travelClass" defaultValue="3A">
            <option>3A</option>
            <option>2A</option>
            <option>SL</option>
          </select>
        </div>

        <div className="form-group">
          <label>Current status</label>
          <input
            name="currentStatus"
            type="text"
            defaultValue="WL 27"
          />
        </div>
      </div>

      <div className="form-bottom">
        <div className="passenger-input">
          <label>Passengers</label>
          <input
            name="passengers"
            type="number"
            min="1"
            max="10"
            defaultValue="2"
          />
        </div>

        <button
  type="submit"
  className="analyse-button"
  disabled={loading}
>
  {loading ? "Analysing..." : "Analyse My Ticket"}
  <ArrowRight size={18} />
</button>
      </div>
    </form>
  );
}

export default TicketForm;