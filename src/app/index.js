import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Main from "./main";
import ProductPage from "../app/product-page";

/**
 * Приложение
 * @returns {React.ReactElement}
 */

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/product/:id",
      element: <ProductPage />,
      errorElement: <>oops</>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
