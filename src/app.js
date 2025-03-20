import React from 'react';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  console.log(list);

  const addItemHandler = () => {
    store.addItem();
  };

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={addItemHandler}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => {
            const selectItemHandler = event => {
              store.selectItem(event.ctrlKey || event.metaKey, item.code);
            };

            const deleteItemHandler = event => {
              event.stopPropagation();
              store.deleteItem(item.code);
            };

            return (
              <div key={item.code} className="List-item">
                <div
                  className={'Item' + (item.selected ? ' Item_selected' : '')}
                  onClick={selectItemHandler}
                >
                  <div className="Item-code">{item.code}</div>
                  <div className="Item-title">
                    <b>{item.title}</b>
                    {item.selectedCounter !== 0 && (
                      <span>| Выделяли {item.selectedCounter} раз</span>
                    )}
                  </div>

                  <div className="Item-actions">
                    <button onClick={deleteItemHandler}>Удалить</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
