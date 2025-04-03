import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';
import { AppProvider } from './app-context';
import { StoreContext } from './store/context';
import { BrowserRouter } from "react-router";
import 'theme.css';

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <AppProvider store={store}>
        <App />
      </AppProvider>
    </BrowserRouter>
  </StoreContext.Provider>,
);
