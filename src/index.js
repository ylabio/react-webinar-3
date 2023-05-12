import React from "react";
import { createRoot } from "react-dom/client";
import { createElement } from "./utils.js";
import App from "./app.js";
import Store from "./store.js";

export const store = new Store({
  list: [
    { code: 1, count: 0, title: "Название элемента" },
    { code: 2, count: 0, title: "Некий объект" },
    { code: 3, count: 0, title: "Заголовок" },
    {
      code: 4,
      count: 0,
      title: "Очень длинное название элемента из семи слов",
    },
    { code: 5, count: 0, title: "Запись" },
    { code: 6, count: 0, title: "Шестая запись" },
    { code: 7, count: 0, title: "Седьмая запись" },
  ],
  id: 7,
});

const root = createRoot(document.getElementById("root"));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
