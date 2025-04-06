import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import 'theme.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Product from './components/product';
import NotFound from './components/notfound';
import { LanguageProvider } from './translation/language-context';

const store = new Store();

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
  },
  {
    path: 'product/:id',
    Component: Product,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  </StoreContext.Provider>,
);
