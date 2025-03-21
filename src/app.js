import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

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
                onClick={(event) => store.selectItem(item.code, event)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  <span className="Item-title-text">{item.title}</span>
                  {item.selectionCount > 0 && (
                    <>
                      <span className="Item-title-separator"> | </span>
                      <span className="Item-selection-count">Выделяли {item.selectionCount} раз</span>
                    </>
                  )}
                </div>
                <div className="Item-actions">
                  <button onClick={(event) => {
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
  );
}

export default App;