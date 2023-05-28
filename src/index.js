import {createRoot} from 'react-dom/client';
import App from './app';
import Store from "./store";
import {StoreContext} from "./store/context";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import ErrorPage from "./components/error-page";
import Product from "./components/product";
import Basket from "./app/basket";

const store = new Store();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "basket",
    element: <Basket/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "products/:productId",
    element: <Product />,
    id: 'product',
    loader: async ({ params }) => {
      return fetch(`api/v1/articles/${params.productId}?fields=*,madeIn(title,code),category(title)`);
    },
  },
]);

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
);
