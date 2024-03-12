import { createRoot } from "react-dom/client";
import App from "./app";
import Store from "./store";
import { StoreContext } from "./store/context";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Item from "./app/item";

const store = new Store();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", search: "?page=:page", index: true, element: <App /> },
      {
        path: "/items/:id",
        element: <Item />,
        id: "itemCard",
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
);
