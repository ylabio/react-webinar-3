import React from 'react';
import { createElement, getCountLabel } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const handleSelectedItemClick = (e, item) => {
    store.selectItem(item.code, !e.ctrlKey);
  };

  const handleDeleteItemClick = (e, item) => {
    e.stopPropagation();
    store.deleteItem(item.code);
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
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={e => handleSelectedItemClick(e, item)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  {item.title}
                  <span className="Item-count">
                    {item.countSelected
                      ? ` | Выделяли ${item.countSelected} ${getCountLabel(item.countSelected, ['раз', 'раза', 'раз'])}`
                      : ''}
                  </span>
                </div>

                <div className="Item-actions">
                  <button onClick={e => handleDeleteItemClick(e, item)}>Удалить</button>
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
