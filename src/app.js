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

  const handleAddItem = event => {
    event.stopPropagation();
    store.addItem();
  };

  const handleDeleteItem = (code, event) => {
    event.stopPropagation();
    store.deleteItem(code);
  };

  const handleSelectItem = (code, event) => {
    const isMultiSelect = event.ctrlKey || event.metaKey;
    store.selectItem(code, isMultiSelect);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="App-head">
          <h1 className='App-head-title"'>Приложение на чистом JS</h1>
        </div>
      </div>
      <div className="separator"></div>
      <div className="container">
        <div className="App-controls">
          <button className="App-controls-btn btn" onClick={handleAddItem}>
            Добавить
          </button>
        </div>
        <div className="App-center">
          <div className="List">
            {list.map(item => (
              <div key={item.code} className="List-item">
                <div
                  className={'Item' + (item.selected ? ' Item_selected' : '')}
                  onClick={e => handleSelectItem(item.code, e)}
                >
                  <div className="Item-code">{item.code}</div>
                  <div className="Item-title">
                    {item.title}
                    {item.selectionCount > 0 && (
                      <div className="Item-selection-count">
                        &nbsp;| Выделяли {item.selectionCount} раз
                      </div>
                    )}
                  </div>

                  <div className="Item-actions">
                    <button
                      className="App-center-btn btn"
                      onClick={e => handleDeleteItem(item.code, e)}
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
    </div>
  );
}

export default App;
