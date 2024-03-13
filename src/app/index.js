import Main from "./main";
import Product, {ProductLoader} from "./product";

import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
    <>
    <Route path="" element={<Main/>} />
    <Route path="product/:_id" element={<Product/>} loader={ProductLoader} />
    </>
    )
    );

  return (
    <RouterProvider router={router} />
  );
}

export default App;
