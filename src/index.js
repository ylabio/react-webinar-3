import {createRoot} from 'react-dom/client';
import App from './app';
import Store from "./store";
import {StoreContext} from "./store/context";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom';
import Article from './pages/article';

const store = new Store();

const router = createBrowserRouter(
  createRoutesFromElements(
      <>
        <Route 
        exact path="/"
        element={<App />} />
        <Route
        exact path='article/:id'
        element={<Article />}
        />
      </>
  )
)

const root = createRoot(document.getElementById('root'));


// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
);
