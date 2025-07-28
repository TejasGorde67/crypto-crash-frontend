import { useState } from "react";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [msg, setMsg] = useState("");
  const [username, setUsername] = useState("testuser");
  const [usdAmount, setUsdAmount] = useState(10);
  const [currency, setCurrency] = useState("BTC");

  const handleBet = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/bet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, usdAmount, currency }),
      });

      const data = await response.json();
      console.log("Backend response:", data);

      if (response.ok) {
        setMsg("Bet placed");
      } else {
        setMsg(data.message || "Failed to place bet.");
      }
    } catch (error) {
      console.error("Error placing bet:", error);
      setMsg("Something went wrong while placing the bet.");
    }
  };

  return (
    <div
      style={{
        background: "#1e1e1e",
        color: "white",
        height: "100vh",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>Crypto Crash</h1>

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          style={{ padding: "0.5rem", fontSize: "1rem", width: "200px" }}
        />

        <input
          type="number"
          value={usdAmount}
          onChange={(e) => setUsdAmount(Number(e.target.value))}
          placeholder="Amount in USD"
          style={{ padding: "0.5rem", fontSize: "1rem", width: "100px" }}
        />

        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        >
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="USDT">USDT</option>
        </select>

        <button
          onClick={handleBet}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            border: "2px solid white",
            backgroundColor: "#1e1e1e",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Place Bet
        </button>
      </div>

      {msg && (
        <p
          style={{
            color: msg === "Bet placed" ? "red" : "white",
            marginTop: "1rem",
          }}
        >
          {msg}
        </p>
      )}
    </div>
  );
}

export default App;
