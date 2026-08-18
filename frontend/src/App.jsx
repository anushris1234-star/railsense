import { useState } from "react";
import { TrainFront } from "lucide-react";
import TicketForm from "./components/TicketForm";
import Prediction from "./pages/Prediction";
import Alternatives from "./pages/Alternatives";
import { predictTicket } from "./api/prediction";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [prediction, setPrediction] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyse = async (payload) => {
    setLoading(true);
    setError("");

    try {
      const result = await predictTicket(payload);

setPrediction(result);
setTicketData(payload);
setPage("prediction");
    } catch (err) {
      console.error(err);
      setError(
        "Unable to analyse the ticket. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  if (page === "prediction") {
    return (
      <Prediction
  prediction={prediction}
  ticketData={ticketData}
  onAlternatives={() => setPage("alternatives")}
/>
    );
  }

  if (page === "alternatives") {
    return (
      <Alternatives
        onBack={() => setPage("prediction")}
      />
    );
  }

  return (
    <main className="app">
      <nav className="navbar">
        <div className="brand">
          <TrainFront size={20} />
          <span>RailWise</span>
        </div>

        <div className="nav-right">
          <span>Ticket Predictor</span>
        </div>
      </nav>

      <section className="home-content">
        <div className="page-intro">
          <h1>Railway Ticket Confirmation Predictor</h1>

          <p>
            Check your waitlisted ticket and estimate its confirmation
            probability using historical booking patterns.
          </p>
        </div>

        <TicketForm onAnalyse={handleAnalyse} />

        {loading && (
          <p className="api-status">
            Analysing your ticket...
          </p>
        )}

        {error && (
          <p className="api-error">
            {error}
          </p>
        )}
      </section>
    </main>
  );
}

export default App;