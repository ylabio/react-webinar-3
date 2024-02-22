import React from "react";
import "./styles.css";
import { pluralize } from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const onDeleteButtonClick = (e, code) => {
    e.stopPropagation();
    store.deleteItem(code);
  };

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на React</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={"Item" + (item.selected ? " Item_selected" : "")}
                onClick={() => store.selectItem(item.code)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  {item.title}
                  {item.timesSelected &&
                    ` | Выделяли ${item.timesSelected} ${pluralize(
                      item.timesSelected,
                      ["раз", "раза"]
                    )}`}
                </div>
                <div className="Item-actions">
                  <button onClick={e => onDeleteButtonClick(e, item.code)}>
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
