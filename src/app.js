import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

function getNumeral(selectCount,titlecounts) {
  return (selectCount % 10 >= 2 && selectCount % 10 <= 4) && !(selectCount >= 12 && selectCount <= 14) ? titlecounts[1] : titlecounts[0]
}

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
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={(e) => store.selectItem(item.code, e)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title}
                  {item.selectCount > 0 ? <span>{` | Выделяли: ${item.selectCount} ${getNumeral(item.selectCount,item.titlecounts)}`}</span> : ''}</div>
                <div className="Item-actions">
                  <button onClick={(e) => {store.deleteItem(item.code); e.stopPropagation()}}>Удалить</button>
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
