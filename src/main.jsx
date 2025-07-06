import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🌳 Aplikasi Silsilah Keluarga</h1>
      <p>Selamat datang di Family Tree App buatan Mas Bintang!</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
