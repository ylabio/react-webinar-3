import {createRoot} from 'react-dom/client';
import App from './app';
import Store from "./store";
import {StoreContext} from "./store/context";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

const store = new Store();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

    </Route>
  )
)

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
);
