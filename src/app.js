import React from 'react';
import { createElement, declOfNum } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
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
        <button className="Button Button-primary" onClick={() => store.addItem()}>
          Добавить
        </button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div
              key={item.code}
              className={'List-item' + (item.selected ? ' Item_selected' : '')}
              onClick={e => store.selectItem(item.code, e)}
            >
              <div className="Item">
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  <b>{item.title}</b>
                  {item?.clickCount > 0
                    ? ` | Выделяли ${item.clickCount} ${declOfNum(item.clickCount, ['раз', 'раза'])}`
                    : ``}
                </div>
                <div className="Item-actions">
                  <button
                    className="Button Button-warning"
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
