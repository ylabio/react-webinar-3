import React, { Suspense } from 'react';
// import {createElement} from './utils.js';
import './styles.css';
import { useTranslation } from 'react-i18next';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list } = store.getState();

  const { t } = useTranslation();

  return (
    <Suspense fallback="...loading">
      <div className="App">
        <div className="App-head">
          <h1>Приложение на чистом JS</h1>
        </div>
        <div className="App-controls">
          <button onClick={() => store.addItem()}>Добавить</button>
        </div>
        <div className="App-center">
          <div className="List">
            {list.map((item) => (
              <div key={item.code} className="List-item">
                <div
                  className={'Item' + (item.selected ? ' Item_selected' : '')}
                  onClick={() => store.selectItem(item.code)}
                >
                  <div className="Item-code">{item.code}</div>
                  <div className="Item-title Title">
                    {item.title}&nbsp;
                    {item.times && (
                      <span className="Title-selected-count">
                        | Выделяли&nbsp;
                        {t('key', { count: item.times })}
                      </span>
                    )}
                  </div>
                  <div className="Item-actions">
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        store.deleteItem(item.code);
                      }}
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
    </Suspense>
  );
}

export default App;
