import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Create a root using createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
