import { createRoot } from 'react-dom/client';
import App from './App';
import React from 'react';

import './styles/style.css';

const root = createRoot(document.getElementById('root'));

root.render(<App />);