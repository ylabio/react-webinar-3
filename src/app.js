import React from "react";
import "./styles.css";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list } = store.getState();
  const endings = ["раз", "раза", "раз"];
  const getNumEnding = (number, endings) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return endings[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  };

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button className="App-buttons" onClick={() => store.addItem()}>
          Добавить
        </button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map((item) => (
            <div key={item.code} className="List-item">
              <div
                className={`Item${item.selected ? " Item_selected" : ""}`}
                onClick={() => store.selectItem(item.code)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  {item.title}{" "}
                  {item.selectedCount > 0 &&
                    `| Выделяли ${item.selectedCount} ${getNumEnding(
                      item.selectedCount,
                      endings
                    )}`}
                </div>
                <div className="Item-actions">
                  <button
                    className="App-buttons"
                    onClick={() => store.deleteItem(item.code)}
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
