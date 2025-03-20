import React from 'react';
import { getTextNumber } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  function handleItemSelect(evt, code) {
    const isCtrlPressed = evt.ctrlKey;
    store.selectItem(code, isCtrlPressed);
  }

  function handleItemDelete(evt, code) {
    evt.stopPropagation();
    store.deleteItem(code);
  }
  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button className="Button-add" onClick={() => store.addItem()}>
          Добавить
        </button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={evt => handleItemSelect(evt, item.code)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  <span className="Item-title-span">{item.title}</span>
                  {`${item?.selectedCount > 0 ? ' | Выделяли ' + getTextNumber(item.selectedCount) : ''}`}
                </div>
                <div className="Item-actions">
                  <button
                    className="Button-delete"
                    onClick={evt => handleItemDelete(evt, item.code)}
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
