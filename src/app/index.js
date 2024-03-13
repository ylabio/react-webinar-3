import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import ProductPage from './product-page';
import useSelector from "../store/use-selector";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
/**
 * Приложение
 * @returns {React.ReactElement}
 */

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />
  },
  {
    path: "/product/:id",
    element: <ProductPage />
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
