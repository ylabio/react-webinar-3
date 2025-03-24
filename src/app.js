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
    if (event.ctrlKey || event.metaKey) {
      store.setCtrlIsActive(true);
    }
  };
  const upCtrl = event => {
    if (event.key === 'Control' || event.key === 'Meta') {
      store.setCtrlIsActive(false);
    }
  };
  const keyBlur = () => {
    if (store.getState().ctrlIsActive) {
      store.setCtrlIsActive(false);
    }
  };

  function pluralizeTimes(count) {
    if (count % 10 === 1 && count % 100 !== 11) {
      return 'раз';
    } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
      return 'раза';
    } else {
      return 'раз';
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', downCtrl);
    window.addEventListener('keyup', upCtrl);
    window.addEventListener('blur', keyBlur);
    store.setIdQueueIncrement();
    return () => {
      window.removeEventListener('keydown', downCtrl);
      window.removeEventListener('keyup', upCtrl);
      window.removeEventListener('blur', keyBlur);
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
                  onClick={() => {
                    store.selectItem(item.code);
                  }}
                >
                  <div className="Item-code">{item.code}</div>
                  <div className="Item-title">
                    {item.title}{' '}
                    <span>
                      {item.count !== 0 && `| Выделяли ${item.count} ${pluralizeTimes(item.count)}`}
                    </span>
                  </div>
                  <div className="Item-actions">
                    <button
                      onClick={event => {
                        event.stopPropagation();
                        store.deleteItem(item.code);
                      }}
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
