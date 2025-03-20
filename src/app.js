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
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div className={'Item-descr' + (item.selected ? ' Item-descr_selected' : '')}
                onClick={(event) => {
                  const ctrlKey = event.ctrlKey || event.metaKey; // Проверяем нажатие Ctrl или Cmd
                  store.selectItem(item.code, ctrlKey)
                }
                }
              >
                <div className='Item'>
                  <div className="Item-code">{item.code}</div>
                  <div className="Item-title">{item.title}</div>
                  {/* Отображаем количество выделений, если оно больше нуля */}
                  {item.selectedCount > 0 && (
                    <div className="Item-selection-count">Выделяли {item.selectedCount} раз</div>
                  )}
                </div>
                <div className="Item-actions">
                  <button onClick={(event) => {
                    event.stopPropagation();
                    store.deleteItem(item.code)
                  }
                  }>Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
}

export default App;
