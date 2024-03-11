import { createBrowserRouter } from "react-router-dom";
import App from "../app";
import ErrorPage from "../components/error";
import ProductPage from "../app/product-page";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
        path: "/:productId",
        element: <ProductPage />,
        errorElement: <ErrorPage />,
    }
  ]);
  


export default router