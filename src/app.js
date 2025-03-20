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
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <ul className="List">
          {list.map(item => (
            <li key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={event => {
                  store.selectItem(item.code, event.ctrlKey);
                }}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  {item.selectCount ? (
                    <>
                      <strong>{item.title}</strong> | Выделяли {item.selectCount} раз
                    </>
                  ) : (
                    <strong>{item.title}</strong>
                  )}
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
