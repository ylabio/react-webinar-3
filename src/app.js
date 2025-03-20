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

  // Событие для отслеживания нажатия клавиш
  function handleKeyDown(event) {
    if (event.key === 'Control') {
      document.body.classList.add('ctrl-pressed');
    }
  }

  function handleKeyUp(event) {
    if (event.key === 'Control') {
      document.body.classList.remove('ctrl-pressed');
    }
  }

  React.useEffect(() => {
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
        <div className="App-actions">
          <button className="Add-button" onClick={() => store.addItem()}>Добавить</button>
        </div>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map((item, index) => (
            <div key={item.code} className={`List-item ${index % 2 === 1 ? '' : 'Tr-color'}`} onClick={() => store.clickOnRow(item.code)}>

              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code, document.body.classList.contains('ctrl-pressed'))}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title}
                  {item.clicks > 0 && ( // Условие для отображения строки с количеством кликов
                    item.clicks >= 2 && item.clicks <= 4 ? (
                      <span className="Item-click"> | Выделяли {item.clicks} раза</span>
                    ) : (
                      <span className="Item-click"> | Выделяли {item.clicks} раз</span>
                    )
                  )}
                </div>
                <div className="Item-actions">
                  <button className="Delete-button" onClick={() => store.deleteItem(item.code)}>Удалить</button>
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

