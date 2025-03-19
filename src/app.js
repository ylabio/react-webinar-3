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
        <h1 className='App-head__title'>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button
          className='Add-button App-button'
          onClick={() => store.addItem()}
        >
          Добавить
        </button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className={`List-item ${item.code % 2 !== 0 && 'List-item--colored'}`}>
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={e => {
                  store.selectItem(e, item.code);
                }}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title}</div>
                {
                  item.selectedTimes > 0 &&
                  <div className="Item__selected-times">
                    | Выделяли {item.selectedTimes} раз
                  </div>
                }
                <div className="Item-actions">
                  <button
                    className='Delete-button App-button'
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
