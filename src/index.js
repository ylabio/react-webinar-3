import { createRoot } from 'react-dom/client';
import Store from './store';
import { StoreContext } from './store/context';
import 'theme.css';
import { RouterProvider } from 'react-router';
import router from './router';

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>,
);
