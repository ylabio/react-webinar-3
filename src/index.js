import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';
import Main from './app/main';
import Product from './app/product';
import { StoreContext } from './store/context';
import { BrowserRouter, Routes, Route } from "react-router";
import 'theme.css';

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <BrowserRouter>
    <StoreContext.Provider value={store}>
      <App>
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/product/:productID" element={<Product />}/>
        </Routes>
      </App>
    </StoreContext.Provider>,
  </BrowserRouter>
);
