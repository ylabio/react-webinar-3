import { createRoot } from 'react-dom/client';
import Store from './store';
import { StoreContext } from './store/context';
import 'theme.css';
import { BrowserRouter } from 'react-router';
import { LanguageProvider } from './i18n/language-context';
import App from './app';

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </StoreContext.Provider>,
);
