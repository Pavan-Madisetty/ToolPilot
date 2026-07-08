import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Prevent layout shift by applying theme before paint
const savedTheme = localStorage.getItem('toolpilot_theme');
const parsed = savedTheme ? JSON.parse(savedTheme) : null;
const theme = parsed?.state?.theme ?? 'light';
document.documentElement.setAttribute('data-theme', theme);
if (theme === 'dark') document.documentElement.classList.add('dark');

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
