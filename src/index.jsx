import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { App } from './shared/App';
import './styles/main.global.scss';
import store from './store/store';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Container not found');
}

const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
