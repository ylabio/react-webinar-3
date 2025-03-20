import React from 'react';
import { useEffect, useState } from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const [isKeyDown, setIsKeyDown] = useState(false);

  // Обработчик нажатия клавиши
  const handleKeyDown = event => {
    if (event.ctrlKey) {
      setIsKeyDown(true);
    }
  };

  // Обработчик отпускания клавиши
  const handleKeyUp = () => {
    setIsKeyDown(false);
  };

  // Подписка на события keydown и keyup
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

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
                onClick={() => {
                  store.selectItem(item.code, isKeyDown);
                }}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  <b>{item.title}</b>
                  {item.countSelected ? ` | Выделяли ${item.countSelected} раз` : ''}
                </div>
                <div className="Item-actions">
                  <button
                    onClick={e => {
                      e.stopPropagation();
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
  );
}

export default App;
