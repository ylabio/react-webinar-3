import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import 'theme.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import ItemPage from './app/item';

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path=":id" element={<ItemPage />} />
      </Routes>
    </BrowserRouter>
  </StoreContext.Provider>,
);
