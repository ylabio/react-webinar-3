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
      <div className='App-container'>
        <div className="App-head">
          <h1>Приложение на чистом JS</h1>
        </div>
      </div>
      <hr/>
      <div className='Main-container'>
        <div className='App-list'>
            <div className="App-controls">
              <button onClick={() => store.addItem()}>Добавить</button>
            </div>
            <div className="App-center">
              <div className="List">
                {list.map(item => (
                  <div key={item.code} className="List-item">
                    <div
                      className={'Item' + (item.selected ? ' Item_selected' : '' + ((list.indexOf(item)+1)%2 != 0? ' Chess':''))} 
                    >
                      <div className="Item-code" onClick={(event) => store.selectItem(item.code,event)}>{item.code}</div>
                      <div className="Item-title" onClick={(event) => store.selectItem(item.code,event)}>{item.title}<span className='Counter'>{(item.selectCount>0 ? ` | Выделяли ${item.selectCount} раз`:'')}</span></div>
                      <div className="Item-actions">
                        <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> 
      </div>
    </div>
  );
}

export default App;
