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
  const selectedItems = store.getSelectedItems();
  const handleItemClick = (event, code) => {
    const isCtrlPressed = event.ctrlKey || event.metaKey;
    store.selectItem(code, isCtrlPressed);
  };
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
          {list.map((item, index) => (
            <div
              key={item.code}
              className={
                'List-item' +
                (index % 2 === 0 ? ' List-item_even' : '') +
                (selectedItems.includes(item.code) ? ' Item_selected' : '')
              }
            >
              <div className={'Item'} onClick={evt => handleItemClick(evt, item.code)}>
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  {item.title}
                  {item.selectedTimes > 0 && (
                    <span className="Item-selectedTimes"> | Выделяли {store.addTimes(item.selectedTimes)}</span>
                  )}
                </div>

                <div className="Item-actions">
                  <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
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
