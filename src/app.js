import React from 'react';
import './styles.css';
import { plural } from './utils';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const itemSelectHandler = (e, code) => {
    if (e.ctrlKey || e.metaKey) {
      store.multipleSelectItem(code);
    } else {
      store.selectItem(code);
    }
  };

  const deleteItemHandler = (e, code) => {
    e.stopPropagation();
    store.deleteItem(code);
  };

  const pluralVariants = {
    one: 'раз',
    few: 'раза',
    many: 'раз',
    other: 'раз',
  };

  return (
    <div className="App">
      <div className="App-head">
        <div className="App-container">
          <h1>Приложение на чистом JS</h1>
        </div>
      </div>
      <div className="App-container">
        <div className="App-controls">
          <button className="Button Button-violet" onClick={() => store.addItem()}>
            Добавить
          </button>
        </div>
        <div className="App-center">
          <div className="List">
            {list.map(item => (
              <div key={item.code} className="List-item">
                <div
                  className={'Item' + (item.selected ? ' Item-selected' : '')}
                  onClick={e => itemSelectHandler(e, item.code)}
                >
                  <div className="Item-code">{item.code}</div>
                  <div className="Item-title">{item.title}</div>
                  {item.clickCount ? (
                    <span className="Item-click">
                      {' '}
                      | Выделяли {item.clickCount} {plural(item.clickCount, pluralVariants)}
                    </span>
                  ) : null}
                  <div className="Item-actions">
                    <button
                      className="Button Button-red"
                      onClick={e => deleteItemHandler(e, item.code)}
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
    </div>
  );
}

export default App;
