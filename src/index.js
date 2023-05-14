import React from "react";
import { createRoot } from "react-dom/client";
import { createElement } from "./utils/utils.js";
import App from "./app.js";
import Store from "./store/store.js";

const store = new Store({
  list: [
    { code: 1, title: "Название элемента", selected: false, scorecard: 0 },
    { code: 2, title: "Некий объект", selected: false, scorecard: 0 },
    { code: 3, title: "Заголовок", selected: false, scorecard: 0 },
    {
      code: 4,
      title: "Очень длинное название элемента из семи слов",
      selected: false,
      scorecard: 0,
    },
    { code: 5, title: "Запись", selected: false, scorecard: 0 },
    { code: 6, title: "Шестая запись", selected: false, scorecard: 0 },
    { code: 7, title: "Седьмая запись", selected: false, scorecard: 0 },
  ],
});

const root = createRoot(document.getElementById("root"));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
