import React from 'react';
import { getWordEnding } from './utils.js';
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
        <div className="wrapper">
          <h1>Приложение на чистом JS</h1>
        </div>
      </div>
      <div className="App-controls wrapper">
        <button className="btn btn--add" onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center wrapper">
        <div className="List">
          {list.map((item) => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={(e) => {
                  const isCtrlPressed = e.ctrlKey || e.metaKey;
                  store.selectItem(item.code, isCtrlPressed);
                }}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-info">
                  <div className="Item-title">{item.title}</div>
                  {item.selectCount > 0 && (
                    <div className="Item-selectCount">
                      |&nbsp;Выделяли {item.selectCount}&nbsp;
                      {getWordEnding(item.selectCount, ['раз', 'раза', 'раз'])}
                    </div>
                  )}
                </div>
                <div className="Item-actions">
                  <button className="btn btn--delete" onClick={(e) => {
                    e.stopPropagation();
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
