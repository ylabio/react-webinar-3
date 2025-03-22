import React from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  i18n
  .use(initReactI18next)
  .init({
    lng: 'ru',
    resources: {
      ru: {
        translation: {
          key_one: 'Выделяли {{count}} раз',
          key_few: 'Выделяли {{count}} раза',
          key_many: 'Выделяли {{count}} раз',
        },
      },
    },
  });

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={(event) => {
                  store.selectItem(item.code, event)
                  store.countSelectItem(item.code)
                }}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title}{ (item.count > 0) ? <span className='Count-text'> | {i18n.t('key', { count: item.count })}</span> :''}</div>
                <div className="Item-actions">
                  <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
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
