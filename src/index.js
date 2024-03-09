import { createRoot } from "react-dom/client";
import App from "./app";
import Store from "./store";
import { StoreContext } from "./store/context";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Item, { itemLoader } from "./app/item";
import Basket from "./app/basket";

const store = new Store();

const root = createRoot(document.getElementById("root"));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>
);
