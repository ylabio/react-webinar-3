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

  const onItemClick = (event, code) => {
    if (event.target.tagName !== 'BUTTON') {
      store.selectItem(code, event.ctrlKey || event.metaKey);
    }
  };

  return (
    <div className="App">
      <div className="App-head">
        <h1 className="App-title container">Приложение на чистом JS</h1>
      </div>
      <div className="App-controls container">
        <button className="Button Button_violet" onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center container">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={(event) => onItemClick(event, item.code)}
              >
                <div>{item.code}</div>

                <div>
                  <b>{item.title}</b>

                  {item.count && <span> | Выделяли {item.count} раз</span>}
                </div>

                <div className="Item-actions">
                  <button className="Button" onClick={() => store.deleteItem(item.code)}>Удалить</button>
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
