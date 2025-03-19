import React from 'react';
import { createElement, getCountWordForm } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const handleItemClick = (code, event) => {
    const isCtrlPressed = event.ctrlKey || event.metaKey;
    store.selectItem(code, isCtrlPressed);
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
                onClick={event => handleItemClick(item.code, event)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  {item.title}
                  {item.selectedCount > 0 && (
                    <span>
                      {' '}
                      | Выделяли {item.selectedCount} {getCountWordForm(item.selectedCount)}
                    </span>
                  )}
                </div>

                <div className="Item-actions">
                  <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
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
