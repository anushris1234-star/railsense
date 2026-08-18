import { useState } from "react";
import { TrainFront } from "lucide-react";
import TicketForm from "./components/TicketForm";
import Prediction from "./pages/Prediction";
import Alternatives from "./pages/Alternatives";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  const handleAnalyse = () => {
    setPage("prediction");
  };

  if (page === "prediction") {
    return (
      <Prediction
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
      </section>
    </main>
  );
}

export default App;