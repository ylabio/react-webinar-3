import React, { useEffect, useState } from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const [isHold, setIsHold] = useState(false);

  useEffect(() => {
    window.addEventListener('keydown', e => {
      console.log(e.key);

      if (e.key === 'Control') {
        setIsHold(true);
      }
    });
    window.addEventListener('keyup', e => {
      if (e.key === 'Control') {
        setIsHold(false);
      }
    });
  }, []);
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
                onClick={() => {
                  store.selectItem(item.code, isHold);
                }}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  <b>{item.title}</b> {item.highlightCount ? ` | Выделяли ${item.highlightCount} раз` : ''}
                </div>
                <div className="Item-actions">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      store.deleteItem(item.code);
                    }}
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
