import React, { useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

const App: React.FC = () => {
  const [url, setURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseURL}/shorten`, { url });
      setShortURL(res.data.shorturl);
    } catch (err) {
      console.error(err);
    }
  };

  const fullShortURL = `${baseURL}/${shortURL}`;

  return (
    <div style={styles.container}>
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setURL(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Shorten</button>
      </form>

      {shortURL && (
        <div style={styles.result}>
          <p>{fullShortURL}</p>
          <button style={styles.smallBtn} onClick={() => navigator.clipboard.writeText(fullShortURL)}>Copy</button>
          <button style={styles.smallBtn} onClick={() => window.open(fullShortURL, "_blank")}>Open</button>
          <div style={{ marginTop: 10 }}>
            <QRCodeCanvas value={fullShortURL} size={100} />
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 400,
    margin: "100px auto",
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  input: {
    padding: "10px",
    fontSize: 16,
  },
  button: {
    padding: "10px",
    background: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  result: {
    marginTop: 20,
  },
  smallBtn: {
    margin: "5px",
    padding: "6px 12px",
    fontSize: 14,
    cursor: "pointer",
  },
};

export default App;
