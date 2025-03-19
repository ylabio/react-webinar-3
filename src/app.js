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
        <h1 className="App-title Well">Приложение на чистом JS</h1>
      </div>
      <div className="App-controls Well">
        <button onClick={() => store.addItem()} className="Button Btn-text">Добавить</button>
      </div>
      <div className="Well">
        <div className="List">
          {list.map(item => (
              <div
                key={item.code}
                className={'List-item Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title}{(item.code === 1 || item.code === 3) && <span className="Item-span"> | Выделяли 7 раз</span>}</div>
                <div className="Item-actions">
                  <button onClick={() => store.deleteItem(item.code)} className="Button Button_accent Btn-text">Удалить</button>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
