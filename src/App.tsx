import React, { useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";


import "./App.css";

const App: React.FC = () => {
  const [url, setURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(baseURL)
      const response = await axios.post(`${baseURL}/shorten`, { url });
      const { shorturl } = response.data;
      setShortURL(shorturl);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopy = () => {
    if (shortURL) {
      navigator.clipboard.writeText(`${baseURL}/${shortURL}`);
    }
  };

  const handleOpenURL = () => {
    if (shortURL) {
      window.open(`${baseURL}/${shortURL}`, "_blank");
    }
  };

  const fullShortURL = `${baseURL}/${shortURL}`;

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter your URL"
          value={url}
          onChange={(e) => setURL(e.target.value)}
          required
        />
        <button type="submit">Shorten</button>
      </form>

      {shortURL && (
        <div className="result">
          <p><strong>Short URL:</strong> {fullShortURL}</p>
          <div className="buttons">
            <button onClick={handleCopy}>Copy</button>
            <button onClick={handleOpenURL}>Open</button>
          </div>
          <div className="qrcode">
            <p><strong>QR Code:</strong></p>
            <QRCodeCanvas value={fullShortURL} size={128} />

          </div>
        </div>
      )}
    </div>
  );
};

export default App;
