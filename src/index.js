import { createRoot } from 'react-dom/client';
import Store from './store';
import { StoreContext } from './store/context';
import 'theme.css';
import { BrowserRouter } from 'react-router';
import { routes } from './routes';
import { LanguageProvider } from './i18n/language-context';

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <LanguageProvider>
        {routes}
      </LanguageProvider>
    </BrowserRouter>
  </StoreContext.Provider>,
);
