import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/`)
      .then((response) => setMessage(response.data))
      .catch((error) => console.error("API error:", error));
  }, []);

  return (
    <div className="text-center bg-blue-500 text-white p-10">
      <h1 className="text-3xl font-bold">{message || "Loading..."}</h1>
    </div>
  );
}

export default App;
