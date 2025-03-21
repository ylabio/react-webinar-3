import React from 'react';
import { createElement } from './utils.js';
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
      <div className="App-main">
        <div className="App-controls">
          <button
            className="Add-button"
            onClick={event => {
              event.stopPropagation();
              store.addItem();
            }}
          >
            Добавить
          </button>
        </div>
        <div className="App-center">
          <div className="List">
            {list.map(item => (
              <div
                key={item.code}
                className={`List-item ${item.code % 2 === 0 ? 'Item-changed' : ''} ${item.selected ? 'Item-selected' : ''}`}
                onClick={event => {
                  store.selectItem(event, item.code);
                }}
              >
                
                  <div className='item-info'>
                    <div className="Item-code">{item.code}</div>
                    <div className="Item-title">
                      {item.title}
                      {!!item.selectedCount && (
                        <span className="Selected-count">{` | Выделяли ${item.selectedCount} раз`}</span>
                      )}
                    </div>
                  </div>
                  <div className="Item-actions">
                    <button
                      onClick={event => {
                        event.stopPropagation();
                        store.deleteItem(item.code);
                      }}
                    >
                      Удалить
                    </button>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
