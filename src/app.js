import React from 'react';
import { createElement } from './utils.js';
import './styles.css';
import getSelectionPlural from './getSelectionPlural.js';

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
        <h1 className="App-header">Приложение на чистом JS</h1>
      </div>
      <hr className="App-divider" />
      <div className="App-controls">
        <button className="Button Button--add" onClick={() => store.addItem()}>
          <b>Добавить</b>
        </button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={event => store.selectItem(item.code, event.ctrlKey || event.metaKey)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  <b>{item.title}</b>
                  {item.selectionCount > 0 && (
                    <>
                      {' | '}
                      <span className="Item-selection-count">
                        Выделяли {getSelectionPlural(item.selectionCount)}
                      </span>
                    </>
                  )}
                </div>
                <div className="Item-actions">
                  <button
                    className="Button Button--delete"
                    onClick={() => store.deleteItem(item.code)}
                  >
                    <b>Удалить</b>
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
