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
        <button className="App-controls_btn add" onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={(evn) => store.selectItem(item.code, evn.ctrlKey)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title}<span class="Item-select-count">{item.selectCount > 0 && `| Выделяли ${item.selectCount} раз`}</span></div>
                <div className="Item-actions">
                  <button
                    className="App-controls_btn delete"
                    onClick={(env) => store.deleteItem(item.code, env)}
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
