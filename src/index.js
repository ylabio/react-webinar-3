import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import { LanguageProvider } from './store/language/language-context';
import 'theme.css';

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <LanguageProvider>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </LanguageProvider>
);
