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
        <button className="Button Button--add" onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map((item , index)=> (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={(e) => store.selectItem(item.code, e)}
                style={{
                  backgroundColor: item.selected ? '#6B4ACB1A' : (index % 2 === 0 ? '#fff' : '#6B4ACB08')
                }}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title}
                {item.selectionCount > 0 && 
                  <p className="Selection-title">&nbsp;| Выделяли {item.selectionCount} раз</p>}
                </div>
                <div className="Item-actions">
                  <button className="Button Button--delete" onClick={(e) => store.deleteItem(item.code, e)}>Удалить</button>
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
