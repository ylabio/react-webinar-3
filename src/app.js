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

  const selectItem = (item) => {
    
    return (event) => {
      if (event.ctrlKey || event.metaKey || item.selected) {
        store.selectItem(item.code);
      } else {
        store.resetSelecting();
        store.selectItem(item.code);
      }
    };
  };
  
  const deleteItem = (code) => {
    return (event) => {
      event.stopPropagation();
      store.deleteItem(code);
    }
  }

  return (
    <div className="App-wrapper">
      <div className="App">
        <div className="App-head">
          <h1>Приложение на чистом JS</h1>
        </div>
        <div className="App-controls">
          <button className="btn btn-purple" onClick={() => store.addItem()}>Добавить</button>
        </div>
        <div className="App-center">
          <div className="List">
            {list.map(item => (
              <div key={item.code} className="List-item">
                <div
                  className={'Item' + (item.selected ? ' Item_selected' : '')}
                  onClick={selectItem(item)}
                >
                  <div className="Item-code">{item.code}</div>
                  <div className="Item-title-wrapper">
                    <div className="Item-title">{item.title}</div>
                    {item.selectionCount && <div>| Выделяли {item.selectionCount} раз</div>}
                  </div>
                  <div className="Item-actions">
                    <button className="btn btn-red" onClick={deleteItem(item.code)}>Удалить</button>
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
