import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../app";
import { memo } from "react";
import ProductPage from "../app/product-page";
import Main from "../app/main";

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

function AppRouter({ children }) {
  return <RouterProvider router={router}>{children}</RouterProvider>;
}

export default memo(AppRouter);
