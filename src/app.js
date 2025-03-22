import React from 'react';
import { createElement, generateCode } from './utils.js';
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
        <button className="App-button Add-button" onClick={() => store.addItem()}>
          Добавить
        </button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={e => store.selectItem(e, item.code)}
              >
                <div className="Item-info">
                  <div className="Item-code">{item.code}</div>
                  <div className="Item-title">{item.title}</div>
                  <div className="Item-counts">
                    {Boolean(item.selectedTimes) && (
                      <span className="Item-counts_count">
                        {`| Выделяли ${item.selectedTimes} раз`}
                      </span>
                    )}
                  </div>
                </div>
                <div className="Item-actions">
                  <button
                    className="App-button Remove-button"
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
