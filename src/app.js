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
      <header className="App-head">
        <h1 className="App-title">Приложение на чистом JS</h1>
      </header>
      <main className="App-center">
        <section className="App-controls">
          <button className="App-button" onClick={() => store.addItem()}>
            Добавить
          </button>
        </section>
        <ul className="List">
          {list.map(item => (
            <li key={item.code} className="List-item">
              <article
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}
              >
                <p className="Item-code">{item.code}</p>
                <h2 className="Item-title">{item.title}</h2>
                <div className="Item-actions">
                  <button className="Item-button" onClick={() => store.deleteItem(item.code)}>
                    Удалить
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
