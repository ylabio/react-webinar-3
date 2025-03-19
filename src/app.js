import React from 'react';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const selectItemHandler = (e) => {
    const isMultipleChoiceKeyPressed = e.ctrlKey || e.metaKey
    store.selectItem(+e.currentTarget.id, isMultipleChoiceKeyPressed)
  }

  const deleteItemHandler = (e) => {
    e.stopPropagation()
    store.deleteItem(+e.currentTarget.id)
  }

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
                id={item.code}
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={selectItemHandler}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title}</div>
                <div className="Item-actions">
                  <button id={item.code} onClick={deleteItemHandler}>Удалить</button>
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
