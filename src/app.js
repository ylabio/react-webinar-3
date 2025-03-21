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
        <h1 className='App-title'>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button className='App-controls__button' onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (

            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={(e) => store.selectItem(item.code, e.ctrlKey || e.metaKey)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  {item.title}&nbsp;
                  {( item.selectionCount > 0 &&
                    <span>Выделяли {item.selectionCount} раз</span>
                  )}
                </div>
                <div className="Item-actions">
                  <button className='Item-actoins__button' onClick={() => store.deleteItem(item.code)}>Удалить</button>
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
