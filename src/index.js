import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import { LanguageContext } from './context/language-context';
import 'theme.css';
import { useState } from 'react';

const store = new Store();

const root = createRoot(document.getElementById('root'));

function Root() {
  const [language, setLanguage] = useState('ru');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <StoreContext.Provider value={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StoreContext.Provider>
    </LanguageContext.Provider>
  );
}

// Первый рендер приложения
root.render(<Root />);
