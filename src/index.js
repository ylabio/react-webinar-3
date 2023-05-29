import {createRoot} from 'react-dom/client';
import App from './app';
import Store from "./store";
import {StoreContext} from "./store/context";
import Product from "./app/product";
import {BrowserRouter} from "react-router-dom";
import {TranslationProvider} from "./locales";

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
    <BrowserRouter>
      <StoreContext.Provider value={store}>
        <TranslationProvider>
          <App />
        </TranslationProvider>
      </StoreContext.Provider>
    </BrowserRouter>
);
