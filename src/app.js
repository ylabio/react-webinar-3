import React from 'react';
import { createElement } from './utils.js';
import "@fontsource/golos-text/700.css";
import "@fontsource/golos-text/400.css";
import "@fontsource/montserrat-alternates/700.css";
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
      <div className="App-center">
        <div className="App-controls">
          <button className="Btn-add" onClick={() => store.addItem()}>Добавить</button>
        </div>
        <div className="List">
          {list.map((item, index) => (
            <div key={index} className={'List-item' + (index % 2 === 0 ? ' Item-striped' : '')}>
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={(e) => store.selectItem(item.code, e.ctrlKey || e.metaKey)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-text">
                  <div className="Item-title">{item.title}</div>
                  {item.countSelect > 0
                    ? <div>| Выделили {item.countSelect} раз</div>
                    : <></>
                  }
                </div>
                <div className="Item-actions">
                  <button className="Btn-del" onClick={(e) => {
                    e.stopPropagation();
                    store.deleteItem(item.code)}}
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
