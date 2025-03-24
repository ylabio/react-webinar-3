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
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button class="btn_add" onClick={() => store.addItem()}><b>Добавить</b></button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={(e) => {
                  if(e.ctrlKey || e.metaKey){
                    store.multiSelectItem(item.code)
                  }else{
                    store.selectItem(item.code)
                  }
                }
              }
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title"><b>{item.title}</b>
                {(
                  item.allocCounter > 0 ? ' | Выделяли ' + item.allocCounter + ' раз' : ''
                  )}
                </div>
                <div className="Item-actions">
                  <button class="btn_del" onClick={() => store.deleteItem(item.code)}><b>Удалить</b></button>
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
