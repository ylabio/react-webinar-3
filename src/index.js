import { createRoot } from "react-dom/client";
import App from "./app";
import Store from "./store";
import { StoreContext } from "./store/context";
import { BrowserRouter } from "react-router-dom";
import { TranslateContextWrapper } from "./contexts/translate-context";

const store = new Store();

const root = createRoot(document.getElementById("root"));

// Первый рендер приложения
root.render(
  <BrowserRouter>
    <StoreContext.Provider value={store}>
      <TranslateContextWrapper>
        <App />
      </TranslateContextWrapper>
    </StoreContext.Provider>
  </BrowserRouter>
);
