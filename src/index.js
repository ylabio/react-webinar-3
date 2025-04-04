import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import { LanguageContext } from './translation/context';
import 'theme.css';

const store = new Store();

function Root() {
  const [language, setLanguage] = useState('ru');

  return (
    <StoreContext.Provider value={store}>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <App />
      </LanguageContext.Provider>
    </StoreContext.Provider>
  );
}

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(<Root />);
