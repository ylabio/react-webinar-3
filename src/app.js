import React, { useState } from 'react';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const [count, setCount] = useState(list.length);
  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => {
          setCount(count + 1);
          store.addItem(count)}}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={(e) => {
                  store.selectItem(item.code, e.ctrlKey || e.metaKey)}}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                {item.title}
                  {item.clickCount !== 0 && (
                    <span>{` | Выделяли ${item.clickCount} раз`}</span>
                  )}
                </div>
                <div className="Item-actions">
                  <button onClick={(e) => {
                    e.stopPropagation();
                    store.deleteItem(item.code);
                    }}>Удалить</button>
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
