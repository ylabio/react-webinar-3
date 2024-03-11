import { createRoot } from "react-dom/client";
import { StoreContext } from "./store/context";

import Store from "./store";

import App from "./app";

import DictionaryProvider from "./components/dictionary-privider";

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <DictionaryProvider>
      <App />
    </DictionaryProvider>
  </StoreContext.Provider>
);
