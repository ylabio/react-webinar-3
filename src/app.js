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
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button
          className="Button App-controls__button"
          onClick={() => store.addItem()}
        >
          <span className="Button__text">Добавить</span>
        </button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={e => store.selectItem(item.code, e.ctrlKey || e.metaKey)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  {item.title}
                  {item.selectionCount > 0 && <span> | Выделяли {item.selectionCount} раз</span>}
                </div>
                <div className="Item-actions">
                  <button
                    className="Button Item-actions__button"
                    onClick={e => {
                      store.deleteItem(item.code);
                      e.stopPropagation();
                    }}
                  >
                    <span className="Button__text">Удалить</span>
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
