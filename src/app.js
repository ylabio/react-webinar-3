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

  const handleItemClick = (event, itemCode) => {
    if (event.ctrlKey || event.metaKey) {
      store.toggleItemSelection(itemCode);
    } else {
      store.selectItem(itemCode);
    }
  };

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button className="App-control__btn" onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={(event) => handleItemClick(event, item.code)}
              >
                <div className="Item-code">{item.code}</div>
                {renderTitleWithSelectionInfo(item)}
                <div className="Item-actions">
                  <button className="Item-actions__btn" onClick={() => store.deleteItem(item.code)}>Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function renderTitleWithSelectionInfo(item) {
  return (
    <div className="Item-title">
      {item.title}
      {item.selectionCount > 0 && (
        <span className="Item-info"> &nbsp;| Выделяли {item.selectionCount} раз</span>
      )}
    </div>
  );
}


export default App;
