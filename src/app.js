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
      <div className="App-center">
        <div className="App-controls">
          <button className="App-button button" onClick={() => store.addItem()}>
            Добавить
          </button>
        </div>

        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={event => store.selectItem(item.code, event.ctrlKey || event.metaKey)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title-container">
                  <div className="Item-title">{item.title}</div>
                  {item.selectionCount > 0 && (
                    <>
                      <span className="Item-separator">|</span>
                      <div className="Item-selection-count">Выделяли {item.selectionCount} раз</div>
                    </>
                  )}
                </div>
                <div className="Item-actions">
                  <button
                    className="Item-button button"
                    onClick={event => {
                      store.deleteItem(item.code);
                      event.stopPropagation();
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
