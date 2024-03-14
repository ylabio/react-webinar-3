import {createRoot} from 'react-dom/client';
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Store from "./store";
import {StoreContext} from "./store/context";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./app/index";
import ItemPage from './app/item-page/index';

const store = new Store();

const root = createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/item/:id",
    element: <ItemPage/>,
  },
]);

// Первый рендер приложения
ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
);
