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
        <button className="button add" onClick={() => store.addItem()}>
          Добавить
        </button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                style={{
                  background: item.selected
                    ? `rgba(107, 74, 203, ${Math.min(0.0314 + item.selectedCount * 0.0007, 0.1)})`
                    : 'transparent',
                }}
                onClick={event => store.selectItem(item.code, event.ctrlKey || event.metaKey)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  {item.title}
                  {item.selectedCount > 0 && (
                    <div className="Item-selected-count">
                      | Выделяли {item.selectedCount}{' '}
                      {item.selectedCount % 10 >= 2 &&
                      item.selectedCount % 10 <= 4 &&
                      !(item.selectedCount % 100 >= 12 && item.selectedCount % 100 <= 14)
                        ? 'раза'
                        : 'раз'}
                    </div>
                  )}
                </div>
                <div className="Item-actions">
                  <button className="button delete" onClick={() => store.deleteItem(item.code)}>
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
