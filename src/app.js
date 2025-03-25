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

  function pluralize(num, titles) {
    let suffix =
      titles[
        num % 10 === 1 && num % 100 !== 11
          ? 0
          : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)
            ? 1
            : 2
      ];
    return suffix;
  }

  const handleDelete = (code, e) => {
    e.stopPropagation();
    store.deleteItem(code);
  };

  const handleItemClick = (code, e) => {
    const isCtrlPressed = e.ctrlKey || e.metaKey;
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
                onClick={e => handleItemClick(item.code, e)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  {item.title}{' '}
                  <span className="Item-counter">
                    {item.timesSelected
                      ? `| Выделяли ${item.timesSelected} ${pluralize(item.timesSelected, ['раз', 'раза', 'раз'])}`
                      : null}
                  </span>
                </div>
                <div className="Item-actions">
                  <button onClick={e => handleDelete(item.code, e)}>Удалить</button>
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
