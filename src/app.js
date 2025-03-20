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
        <div className="container">
          <h1 className="">Приложение на чистом JS</h1>
        </div>
      </div>
      <div className="container">
        <div className="App-controls ">
          <button className="Button Button_primary" onClick={() => store.addItem()}>
            Добавить
          </button>
        </div>
      </div>
      <div className="App-center container">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={e => {
                  if (e.target.closest('button')) {
                    return;
                  }
                  store.selectItem(item.code, e.ctrlKey);
                }}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  <strong>{item.title}</strong>
                </div>
                <div className="Item-actions">
                  <button
                    className="Button Button_primary"
                    onClick={() => store.deleteItem(item.code)}
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
