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
        <button 
          onClick={() => store.addItem()}
          className="App-add-button"
        >
          Добавить
        </button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={(e) => {
                  const isCtrlPressed = e.ctrlKey || e.metaKey;
                  store.selectItem(item.code, isCtrlPressed);
                }}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title-container">
                  <div className="Item-title">{item.title}</div>
                  {item.selectCount > 0 && (
                    <div className="Item-select-counter">
                      | Выделяли {item.selectCount} раз
                    </div>
                  )}
                </div>
                <div className="Item-actions">
                  <button 
                    onClick={() => store.deleteItem(item.code)}
                    className="Item-delete-button"
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