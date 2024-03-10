import {createRoot} from 'react-dom/client';
import App from './app';
import Store from "./store";
import {StoreContext} from "./store/context";
import { BrowserRouter} from 'react-router-dom';
import { LanguageProvider } from './languages/languagesContext';
const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <LanguageProvider>
        <App/>
      </LanguageProvider>
    </BrowserRouter>
  </StoreContext.Provider>
);
