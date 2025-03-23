import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */

function pluralize(count) {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return 'раз';
  } else if ([2, 3, 4].includes(lastDigit) && !(lastTwoDigits >= 11 && lastTwoDigits <= 14)) {
    return 'раза';
  } else {
    return 'раз';
  }
}

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
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={e => store.selectItem(item.code, e)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  {item.title}
                  {item.count && (
                    <div className="Item-selectedCount">
                      | Выделяли {item.count} {pluralize(item.count)}
                    </div>
                  )}
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
