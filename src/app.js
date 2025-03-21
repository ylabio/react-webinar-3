import React from 'react';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const state = store.getState();
  const { list, selectedItems, selectionCounts } = state;

  const handleItemClick = (code, event) => {
    store.selectItem(code, event.ctrlKey || event.metaKey);
  };

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
              <div
                className={'Item' + (selectedItems.has(item.code) ? ' Item_selected' : '')}
                onClick={e => handleItemClick(item.code, e)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  {item.title}
                  {selectionCounts[item.code] > 0 && (
                    <span className="Item-selection-count">
                      Выделяли {selectionCounts[item.code]} раз
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
