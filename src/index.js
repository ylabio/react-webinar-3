import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import 'theme.css';
import { BrowserRouter } from 'react-router-dom';

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <BrowserRouter future={{ v7_startTransition: true, v7_fetcherPersist: true, v7_relativeSplatPath: true }}>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </BrowserRouter>
);
