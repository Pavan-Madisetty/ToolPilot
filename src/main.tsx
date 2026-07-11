import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Migrate localStorage keys from old brand (toolpilot_*) to new brand (toolskyt_*)
const legacyKeys = [
  'theme',
  'design',
  'favorites',
  'history',
  'recently_used',
  'checklist',
  'notes',
  'runtime_config_cache',
];

legacyKeys.forEach((key) => {
  const oldKey = `toolpilot_${key}`;
  const newKey = `toolskyt_${key}`;
  const oldVal = localStorage.getItem(oldKey);
  if (oldVal !== null && localStorage.getItem(newKey) === null) {
    localStorage.setItem(newKey, oldVal);
  }
});

// Handle wildcard keys starting with toolpilot_tool_history_
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key && key.startsWith('toolpilot_tool_history_')) {
    const newKey = key.replace('toolpilot_', 'toolskyt_');
    if (localStorage.getItem(newKey) === null) {
      const val = localStorage.getItem(key);
      if (val !== null) {
        localStorage.setItem(newKey, val);
      }
    }
  }
}

// Prevent layout shift by applying theme before paint
const savedTheme = localStorage.getItem('toolskyt_theme');
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
