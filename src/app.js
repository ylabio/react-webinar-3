import React from 'react';
import { createElement, getPluralForm } from './utils.js';
import './styles.css';

const pluralForms = new Map([
  ['one', 'раз'],
  ['few', 'раза'],
  ['many', 'раз'],
  ['other', 'раза'],
]);

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  /**
   * @param {number} opts.number - число
   * @returns {string}
   */
  const formattedSelectionCount = number =>
    ` | Выделяли ${number} ${getPluralForm({ locale: 'ru', type: 'cardinal', number, pluralForms })}`;

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button className="Button Button_primary" onClick={() => store.addItem()}>
          Добавить
        </button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div
              key={item.code}
              className={'List-item' + (item.selected ? ' List-item_selected' : '')}
              onClick={e => store.selectItem(item.code, e.ctrlKey || e.metaKey)}
            >
              <div className="Item">
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  {item.title}
                  <span className="Item-selectedCount">
                    {item.selectedCount > 0 && formattedSelectionCount(item.selectedCount)}
                  </span>
                </div>
              </div>
              <div className="Item-actions">
                <button
                  className="Button Button_danger"
                  onClick={e => {
                    e.stopPropagation();
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
  );
}

export default App;
