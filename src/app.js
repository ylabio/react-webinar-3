import React from 'react';
import { pluralize } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  function handleSelect(e, code) {
    const isMultiSelect = e.ctrlKey || e.metaKey;
    store.selectItem(code, isMultiSelect);
  }

  function handleAddItem() {
    store.addItem();
  }

  function handleDeleteItem(e, code) {
    e.stopPropagation();
    store.deleteItem(code);
  }


  function getSelectionText(countSelected) {
    if (!countSelected) return "";

    const text = pluralize({
      count: countSelected,
      formMany: "раз",
      formOne: "раз",
      formFew: "раза",
    });

    return ` | Выделяли ${countSelected} ${text}`;
  }

  return (
    <div className="App">
      <header className="App-head">
        <h1 className="App-title Well">Приложение на чистом JS</h1>
      </header>
      <main className="App-main Well">
        <button onClick={handleAddItem} className="App-controls Button">Добавить</button>
        <ul className="List">
          {list.map(item => (
            <li
              key={item.code}
              className={"List-item Item" + (item.selected ? " Item_selected" : "")}
              onClick={(e) => handleSelect(e, item.code)}
            >
              <div className="Item-info">
                <span>{item.code}</span>
                <p>
                  <span className="Item-title">{item.title}</span>
                  {getSelectionText(item.countSelected)}
                </p>
              </div>
              <button onClick={(e) => handleDeleteItem(e, item.code)}
                      className="Item-actions Button Button_accent">Удалить
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
