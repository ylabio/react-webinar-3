import React from "react";
import { createRoot } from "react-dom/client";
import { createElement } from "./utils.js";
import App from "./app.js";
import Store from "./store.js";
import { counter } from "./counter.js";

const store = new Store({
    list: [
        { code: counter(), title: "Название элемента", count: 0 },
        { code: counter(), title: "Некий объект", count: 0 },
        { code: counter(), title: "Заголовок", count: 0 },
        {
            code: counter(),
            title: "Очень длинное название элемента из семи слов",
            count: 0
        },
        { code: counter(), title: "Запись", count: 0 },
        { code: counter(), title: "Шестая запись", count: 0 },
        { code: counter(), title: "Седьмая запись", count: 0 }
    ]
});

const root = createRoot(document.getElementById("root"));

store.subscribe(() => {
    root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
