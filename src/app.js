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
      <div className="App-main">
        <div className="App-controls">
          <button className="Button Add-button" onClick={() => store.addItem()}>Добавить</button>
        </div>
        <div className="App-center">
          <div className="List">
            {list.map(item => (
              <div key={item.code}
                className={'List-item' + (item.selected ? ' List-item_selected' : '')}
                onClick={(event) => store.selectItem(item.code, event)}>
                <div className="Item">
                  <div className="Item-code">{item.code}</div>
                  <div className="Item-title">{item.title}</div>
                  <div className="Item-actions">
                    <button className="Button Delete-button" onClick={(event) => {
                      event.stopPropagation();
                      store.deleteItem(item.code);
                    }}>Удалить</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
