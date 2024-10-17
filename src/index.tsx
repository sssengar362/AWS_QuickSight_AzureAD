import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client' for React 18
import App from "./App";
import "./index.css";

// Get the root element from the DOM safely
const rootElement = document.getElementById("root");

if (rootElement) {
  // Create the root using the createRoot method
  const root = ReactDOM.createRoot(rootElement);

  // Render the application with the new createRoot API
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error(
    "Root element not found. Please ensure you have a <div id='root'> in your HTML."
  );
}
