import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import 'theme.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductPage from './app/product-page';
import { getProductDetails } from './app/api/api';

const store = new Store();

const root = createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'products/:itemId',
    element: <ProductPage />,
    loader: getProductDetails,
  },
]);

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>,
);
