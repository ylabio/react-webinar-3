import React from "react";
import { createElement } from "./utils.js";
import "./styles.css";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  function clickQuantity(number) {
    if (number > 10 && [12, 13, 14].includes(number % 100))
      return `| Выделяли ${number} раз`;
    let last_num = number % 10;
    if (last_num == 1) return `| Выделяли ${number} раз`;
    if ([2, 3, 4].includes(last_num)) return `| Выделяли ${number} раза`;
    if ([5, 6, 7, 8, 9, 0].includes(last_num))
      return ` | Выделяли ${number} раз`;
  }

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map((item) => (
            <div key={item.code} className="List-item">
              <div
                className={"Item" + (item.selected ? " Item_selected" : "")}
                onClick={() => store.selectItem(item.code)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  {item.count
                    ? `${item.title} ${clickQuantity(item.count)}`
                    : item.title}
                </div>
                <div className="Item-actions">
                  <button
                    onClick={(event) => {
                      store.deleteItem(item.code);
                      event.stopPropagation();
                    }}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
