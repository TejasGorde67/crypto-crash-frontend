import { useState } from "react";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [msg, setMsg] = useState("");
  const [username, setUsername] = useState("testuser");
  const [usdAmount, setUsdAmount] = useState(10);
  const [currency, setCurrency] = useState("BTC");

  const handleBet = async () => {
    const response = await fetch(`${API_BASE}/api/bet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, usdAmount, currency }),
    });

    const data = await response.json();
    setMsg(data.msg || "Bet placed");
  };

  return (
    <div>
      <h1>Crypto Crash</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="number"
        value={usdAmount}
        onChange={(e) => setUsdAmount(Number(e.target.value))}
        placeholder="USD Amount"
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="BTC">BTC</option>
        <option value="ETH">ETH</option>
      </select>
      <button onClick={handleBet}>Place Bet</button>
      <p>{msg}</p>
    </div>
  );
}

export default App;
