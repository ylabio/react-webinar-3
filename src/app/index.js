import {useCallback, useContext, useEffect, useState} from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import Product from './product';
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import PageLayout from '../components/page-layout';

/**
 * Приложение
 * @returns {React.ReactElement}
 */

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      { index: true, element: <Main /> },
      {
        path: 'product/:productId',
        element: <Product />
      }
    ]
  },

])

function App() {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  );
}

export default App;
