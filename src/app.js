import React from 'react';
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
        <div className="wrapper">
          <h1>Приложение на чистом JS</h1>
        </div>
      </div>
      <div className="wrapper">
        <div className="App-controls">
          <button onClick={() => store.addItem()}>Добавить</button>
        </div>
      </div>
      <div className="App-center wrapper">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={e => store.selectItem(item.code, e)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  <span>{item.title}</span>{' '}
                  {item.counter ? `| Выделяли ${item.counter} раз` : false}
                </div>
                <div className="Item-actions" onClick={e => e.stopPropagation()}>
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
