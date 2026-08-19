const API_URL = "railsense-production.up.railway.app";

export async function predictTicket(payload) {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Prediction request failed");
  }

  return response.json();
}

export async function simulateTicket(current, changes) {
  const predictionPayload = { ...current };
  delete predictionPayload.journey_date;

  const response = await fetch(`${API_URL}/simulate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      current: predictionPayload,
      changes,
    }),
  });

  if (!response.ok) {
    throw new Error("Simulation request failed");
  }

  return response.json();
}
export async function getAlternatives(ticketData) {
  const alternativesPayload = { ...ticketData };
  delete alternativesPayload.journey_date;

  const response = await fetch(`${API_URL}/alternatives`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(alternativesPayload),
  });

  if (!response.ok) {
    throw new Error("Alternatives request failed");
  }

  return response.json();
}