import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import LanguageProvider from "./language-provider"; 
import Store from "./store";
import { StoreContext } from "./store/context";

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <LanguageProvider>
    <StoreContext.Provider value={store}>
      <App/>
    </StoreContext.Provider>
  </LanguageProvider>
);