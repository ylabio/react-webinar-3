import React, { useEffect } from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const downCtrl = event => {
    if (event.key === 'Control') {
      store.setCtrlIsActive(true);
    }
  };
  const upCtrl = event => {
    if (event.key === 'Control') {
      store.setCtrlIsActive(false);
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', downCtrl);
    window.addEventListener('keyup', upCtrl);
    store.setIdQueueIncrement();
    return () => {
      window.removeEventListener('keydown', downCtrl);
      window.removeEventListener('keyup', upCtrl);
    };
  }, []);
  return (
    <div className="App">
      <div className="App-container">
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
                  onClick={() => store.selectItem(item.code)}
                >
                  <div className="Item-code">{item.code}</div>
                  <div className="Item-title">
                    {item.title} <span>{item.count !== 0 && `| Выделяли ${item.count} раз`}</span>
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
    </div>
  );
}

export default App;
