import React from "react";
import "./styles.css";
import { randomInt } from "./utils.js";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */


function App({ store }) {
  const list = store.getState().list;

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
          {list.map(
            (item) => <Item store={store} item={item} />
          )}
        </div>
      </div>
    </div>
  );
}

const Item = ({item, store}) => {
	
  return (
    <div key={item.code} className="List-item">
      <div
        className={"Item" + (item.selected ? " Item_selected" : "")}
        onClick={() => store.selectItem(item.code)}
      >
        <div className="Item-code">{item.code}</div>
        <div className="Item-title">{item.title}</div>
        {item.selectedCount && (
          <div className="Item-count">{` | Выделяли ${item.selectedCount} раз`}</div>
        )}
        <div className="Item-actions">
          <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
        </div>
      </div>
    </div>
  );
};

export default App;
