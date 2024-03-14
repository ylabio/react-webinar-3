import {createRoot} from 'react-dom/client';
import Store from "./store";
import {StoreContext} from "./store/context";
import LanguageContextProvider from './languageContext';
import App from './app';

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <LanguageContextProvider>
      <App />
    </LanguageContextProvider>
  </StoreContext.Provider>
);
