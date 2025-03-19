import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list } = store.getState();

  return (
    <div className="App">


      <div className="App-center">

        <div className="List">
          <div className="App-head">
            <h1>Приложение на чистом JS</h1>
          </div>
          <div className="App-controls">
            <button className='btn' style={{ background: 'var(--color-accent)' }} onClick={() => store.addItem()}>Добавить</button>
          </div>

          {list && list.map((item) => (
            <div key={item.code} >

              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={(e) => store.selectItem(item.code, e)
                }
              >
                <div className='item-info'>
                  <div className="Item-code">{item.code}</div>
                  <div className="Item-title">{item.title}

                    {item.countSelected > 0 && (
                      <span
                        className="item-count-selected"
                      >
                        | Выделяли {item.countSelected} раз
                      </span>
                    )}


                  </div>

                </div>
                <div className="Item-actions">
                  <button className='btn' style={{ background: 'var(  --color-danger)' }} onClick={() => store.deleteItem(item.code)}>Удалить</button>
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
