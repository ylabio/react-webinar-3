import { createBrowserRouter } from "react-router-dom";
import Main from "../app/main";
import Product from "../app/product";

const router = createBrowserRouter([
    {
        path:"/",
        element: <Main/>,
    },
    {
      path: "/:id",
      element: <Main />,
    },
    {
        path: "product/:id",
        element: <Product/>
    },
])

export default router