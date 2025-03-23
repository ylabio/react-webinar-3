import React from 'react';
import './styles.css';
import { pluralize } from './utils.js';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  return (
    <div className="App">
      <div className="App-head Container">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls Container">
        <button className="Button Button_type_add" onClick={() => store.addItem()}>
          Добавить
        </button>
      </div>
      <div className="App-center Container">
        <ul className="List">
          {list.map(item => (
            <li key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={evt => store.selectItem(item.code, evt)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  {item.title}
                  {item.count > 0 && (
                    <span className="Item-count">
                      {' '}
                      | Выделяли {item.count} {pluralize(item.count)}
                    </span>
                  )}
                </div>

                <div className="Item-actions">
                  <button
                    className="Button Button_type_delete"
                    onClick={evt => store.deleteItem(item.code, evt)}
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
