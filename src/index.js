import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import 'theme.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductPage from './app/product-page';
import { getProductDetails } from './app/api/api';
import { ROUTES } from './constants';
import { LanguageProvider } from './hooks/useLanguage';

const store = new Store();

const root = createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <App />,
  },
  {
    path: ROUTES.PRODUCT(':id'),
    element: <ProductPage />,
    loader: getProductDetails,
  },
]);

// Первый рендер приложения
root.render(
  <LanguageProvider>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </LanguageProvider>,
);
