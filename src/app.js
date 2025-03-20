import React, { useEffect, useState } from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setState(store.getState()));
    return () => unsubscribe();
  }, []);

  const handleItemClick = (code, event) => {
    store.selectItem(code, event.ctrlKey || event.metaKey);
  };

  return (
    <div className="App">
      <div className="App-head">
        <div className="App-container">
          <h1>Приложение на чистом JS</h1>
        </div>
      </div>
      <div className="App-container">
        <div className="App-controls">
          <button onClick={() => store.addItem()} className="App-button App-button_primary">
            Добавить
          </button>
        </div>
        <div className="App-center">
          <div className="List">
            {state.list.map(item => (
              <div key={item.code} className="List-item">
                <div
                  className={'Item' + (item.selected ? ' Item_selected' : '')}
                  onClick={e => handleItemClick(item.code, e)}
                >
                  <div className="Item-code">{item.code}</div>
                  <div className="Item-title">
                    {item.title}{' '}
                    {item.selectionCount > 0 && <span>Выделяли {item.selectionCount} раз</span>}
                  </div>
                  <div className="Item-actions">
                    <button
                      onClick={() => store.deleteItem(item.code)}
                      className="App-button App-button_delete"
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
    </div>
  );
}

export default App;
