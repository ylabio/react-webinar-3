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
        <button onClick={() => store.addItem(store.state.lastCode)}>Добавить</button>   
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(event, item.code, item.count, item.pluralize)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title}
                  <span className="span-count">
                    {item.count > 0 ? ` | Выделяли ${item.count} ${item.pluralize}` : ''}
                    </span>
                </div>
                <div className="Item-actions">
                  <button onMouseDown={() => store.deleteItem(item.code)}>Удалить</button>
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
