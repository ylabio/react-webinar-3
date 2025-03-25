import React from 'react';
import './styles.css';
import { getDeclensionWord } from './utils';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  return (
    <div className="App">
      <header className="App-head">
        <h1>Приложение на чистом JS</h1>
      </header>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={(evt) => store.selectItem(item.code, evt.ctrlKey || evt.metaKey)
                }
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  {item.title}
                  {item.counter > 0 && (
                  <span className="Item-counter">
                    Выделяли {item.counter} {getDeclensionWord(item.counter)}
                  </span>
                  )}
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
  );
}

export default App;
