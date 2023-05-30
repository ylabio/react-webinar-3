import {createRoot} from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './app';
import Store from "./store";
import {StoreContext} from "./store/context";
import { LangProvider } from './i18n/lang-context';

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <LangProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </LangProvider>
  </StoreContext.Provider>
);
