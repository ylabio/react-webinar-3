import React, {useState} from 'react';
import './styles.css';
import {numeralDeclension} from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const selectHandler = (evt, code) => {
    if (evt.ctrlKey || evt.metaKey) {
      store.selectItem(code, true)
    } else {
      store.selectItem(code, false)
    }
  }

  return (
    <>
      <div className="App-head">
        <div className="container">
          <h1>Приложение на чистом JS</h1>
        </div>
      </div>
      <div className="App container">
        <div className="App-controls">
          <button className="button add-button" onClick={() => store.addItem()}>Добавить</button>
        </div>
        <div className="App-center">
          <div className="List">
            {list.map(item => (
              <div key={item.code} className="List-item">
                <div
                  className={'Item' + (item.selected ? ' Item_selected' : '')}
                  onClick={(evt) => selectHandler(evt, item.code)}
                >
                  <div className="Item-code">{item.code}</div>
                  <div className="Item-text">
                    <div className="Item-title">
                      {item.title}
                    </div>
                    { item.selectCount !== 0 && <div className="Item-description"> | Выделяли {item.selectCount} {numeralDeclension(item.selectCount)}</div> }
                  </div>
                  <div className="Item-actions">
                    <button className="button delete-button" onClick={() => store.deleteItem(item.code)}>Удалить</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
