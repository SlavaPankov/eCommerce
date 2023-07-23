import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './shared/App';
import './styles/main.global.scss';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Container not found');
}
const root = createRoot(container);
root.render(<App />);
