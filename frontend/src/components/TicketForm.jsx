import { ArrowRight } from "lucide-react";

function TicketForm({ onAnalyse }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyse();
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
          <select defaultValue="Delhi">
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Bangalore</option>
            <option>Kolkata</option>
            <option>Chennai</option>
          </select>
        </div>

        <div className="form-group">
          <label>To</label>
          <select defaultValue="Mumbai">
            <option>Mumbai</option>
            <option>Delhi</option>
            <option>Bangalore</option>
            <option>Kolkata</option>
            <option>Chennai</option>
          </select>
        </div>

        <div className="form-group">
          <label>Journey date</label>
          <input type="date" defaultValue="2026-09-15" />
        </div>

        <div className="form-group">
          <label>Train</label>
          <select defaultValue="12952">
            <option value="12952">12952</option>
            <option value="12954">12954</option>
            <option value="12956">12956</option>
          </select>
        </div>

        <div className="form-group">
          <label>Class</label>
          <select defaultValue="3A">
            <option>3A</option>
            <option>2A</option>
            <option>SL</option>
          </select>
        </div>

        <div className="form-group">
          <label>Current status</label>
          <input type="text" defaultValue="WL 27" />
        </div>
      </div>

      <div className="form-bottom">
        <div className="passenger-input">
          <label>Passengers</label>
          <input type="number" min="1" max="10" defaultValue="2" />
        </div>

        <button type="submit" className="analyse-button">
          Analyse My Ticket
          <ArrowRight size={18} />
        </button>
      </div>
    </form>
  );
}

export default TicketForm;