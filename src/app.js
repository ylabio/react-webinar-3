import React from 'react';
import { plural } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const handleSelectItem = (event, code) => {
    const isCmdPress = event.metaKey || event.ctrlKey;
    store.selectItem(code, isCmdPress);
  };

  const handleDeletItem = (event, code) => {
    event.stopPropagation();
    store.deleteItem(code);
  };

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button className="App-controls-button" onClick={() => store.addItem()}>
          Добавить
        </button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={e => handleSelectItem(e, item.code)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  {item.title}{' '}
                  <span>
                    {item.quantity && `| Выделяли${plural(item.quantity, 'раз', 'раза', 'раз')}`}
                  </span>
                </div>
                <div className="Item-actions">
                  <button className="Item-button" onClick={(e) => handleDeletItem(e, item.code)}>
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
