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
    <div className="app">
      <div className="app__head">
        <div className='container'>
          <h1>Приложение на чистом JS</h1>
        </div>
      </div>
      <div className="app__controls container">
          <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="app__center container">
        <div className="list">
          {list.map(item => (
            <div key={item.code} className="list__item">
              <div
                className={'item' + (item.selected ? ' item--selected' : '')}
                onClick={(event) => store.selectItem(item.code, event)}
              >
                <div className="item__code">{item.code}</div>
                <div className="item__title">
                  {item.title}
                  {item.selectCount > 0 && (
                    <span className="item__selected-count">
                      {' | Выделяли ' + item.selectCount + ' раз'}
                    </span>
                  )}
                </div>
                <div className="item__actions">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      store.deleteItem(item.code);
                    }}
                  >Удалить</button>
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
