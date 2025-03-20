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

  const handleSelect = (code, event) => {
    store.selectItem(code, event.ctrlKey || event.metaKey);
  };

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()} className="Button-add">Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={event => handleSelect(item.code, event)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title}</div>
                {item.selectionCount > 0 && ( // Отображаем только, если больше 0
                  <div className="Item-selection-count"> | Выделяли {item.selectionCount} раз</div>
                )}
                <div className="Item-actions">
                  <button onClick={() => store.deleteItem(item.code)} className='Button-delete'>Удалить</button>
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
