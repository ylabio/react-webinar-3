import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import 'theme.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Main from './app/main';
import ItemPage from './app/item-page';

const store = new Store();
const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Main></Main>,
      },
      {
        path: '/item/:id',
        element: <ItemPage></ItemPage>,
      },
      {
        path: '*',
        element: <div>Error</div>,
      },
    ],
  },
]);

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router}></RouterProvider>
  </StoreContext.Provider>,
);
