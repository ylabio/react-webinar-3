import React from "react";
import { createElement } from "./utils.js";
import "./styles.css";

function getNoun(number, one, two, five) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const handleClickItem = (code) => {
    return () => {
      list.map((item) => {
        if ((item.code !== code && item.selected) || item.code === code) {
          store.selectItem(item.code);
        }

        if (item.code === code && item.selected){
          store.countClick(item.code)
        }
      });
    };
  };

  const deleteItem = (e, code) => {
    e.stopPropagation();
    store.deleteItem(code);
  };

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
                onClick={handleClickItem(item.code)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title}</div>

                {item.count && (
                  <>
                    <div className="sep">
                      <span>|</span>
                    </div>
                    <div className="Item-count">
                      Выделяли {item.count}{" "}
                      {getNoun(item.count, "раз", "раза", "раз")}
                    </div>
                  </>
                )}
                <div className="Item-actions">
                  <div className="Item-actions-wrapper">
                    <button onClick={(e) => deleteItem(e, item.code)}>
                      Удалить
                    </button>
                  </div>
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
