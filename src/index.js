import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import 'theme.css';
import { BrowserRouter } from 'react-router';
import { LanguageProvider } from './store/lang/language-context';

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <BrowserRouter>
    <LanguageProvider>
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </LanguageProvider>
  </BrowserRouter>,
);
