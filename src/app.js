import React from "react";
import { createElement } from "./utils.js";
import "./styles.css";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  function declOfNum(n) {
    n = Math.abs(n) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) {
      return " раз";
    }
    if (n1 > 1 && n1 < 5) {
      return " раза";
    }
    if (n1 == 1) {
      return " раз";
    }
    return " раз";
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
                  <div className="Item-title__text">{item.title} </div>

                  {item.selectedCount ? (
                    <div className="Item-title__selectedCount">
                      {" | "}
                      Выделяли {item.selectedCount}
                      {declOfNum(item.selectedCount)}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="Item-actions">
                  <button
                    onClick={() => {
                      store.deleteItem(item.code);
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
