import React from 'react';
import {createElement} from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list;

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={(event) => store.addItem(event)}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map((item, idx) => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (idx % 2 === 0 ? ' Item_shadow' : '') + (item.selected ? ' Item_selected' : '')}
                onClick={(event) => store.selectItem(item.code, event)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title}{item.selectedMessage && <span>{item.selectedMessage}</span> }</div>
                <div className="Item-actions">
                  <button onClick={(ev) => store.deleteItem(item.code, ev)}>Удалить</button>
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
