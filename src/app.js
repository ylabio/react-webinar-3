import React, { useState, useEffect } from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const list = store.getState().list;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Control' || event.key === 'Meta') {
        setIsCtrlPressed(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'Control' || event.key === 'Meta') {
        setIsCtrlPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleClickItem = (code) => {
    store.selectItem(code, isCtrlPressed)
  }

  const handleClickDeleteBtn = (e, code) => {
    e.stopPropagation();

    store.deleteItem(code);
  }

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
                onClick={() => handleClickItem(item.code)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title}</div>
                {
                  item.selectCount > 0 &&
                  <div className='Item-select-count'>| Выделяли {item.selectCount} раз</div>
                }
                <div className="Item-actions">
                  <button onClick={(e) => handleClickDeleteBtn(e, item.code)}>Удалить</button>
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
