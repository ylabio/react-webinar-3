import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import 'src/style.css';
import { store } from './store/instance';
import AppRoutes from "./app-routs";

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(
    <Router>
      <AppRoutes store={store} />
    </Router>
  );
});

root.render(
  <Router>
    <AppRoutes store={store} />
  </Router>
);
