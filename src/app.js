import React from 'react';
import { createElement, getWordForm } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        {/** Берём код последнего элемента на 1 больше в качестве уникального */}
        <button onClick={() => store.addItem(list.at(-1).code + 1)}>Добавить</button>{' '}
      </div>
      <div className='App-center'>
        <div className='List'>
          {list.map((item) => (
            <div key={item.code} className='List-item'>
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={(event) => store.selectItem(item.code, event)}
              >
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>
                  {item.title +
                    `${item.count ? ` | Выделялось ${item.count} ${getWordForm(item.count)}` : ''}`}
                </div>
                <div className='Item-actions'>
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
