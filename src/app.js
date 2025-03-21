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

  const handleItemClick = (code, event) => {
    const isMultiSelect = event.ctrlKey || event.metaKey;
    store.selectItem(code, isMultiSelect);
  };



  return (
    <div className="App">
     <header className="App-head">
       <div className='container'>
         <h1 className='title'>Приложение на чистом JS</h1>
       </div>
      </header>
    <main>
      <div className='container'>
        <div className="App-controls">
          <button className='add' onClick={() => store.addItem()}>Добавить</button>
        </div>
        <div className="App-center">
          <ul className="List">
            {list.map(item => (
              <li key={item.code} className="List-item">
                <div
                  className={'Item' + (item.selected ? ' Item_selected' : '')}
                  onClick={(event) => handleItemClick(item.code, event)}
                >
                  <div className="Item-code">{item.code}</div>
                  <div className="Item-title">{item.title}&nbsp;</div>
                  {item.selectionCount > 0 && (
                    <p className="Selection-count">|
                       Выделяли {item.selectionCount} раз
                    </p>
                  )}
                  <div className="Item-actions">
                    <button className='remove' onClick={(e)  => {
                      e.stopPropagation();
                      store.deleteItem(item.code);
                    }}>Удалить</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
    </div>
  );
}

export default App;
