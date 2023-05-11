import React from 'react';
import {createElement} from './utils.js';
import './styles.css';
import plural from 'plural-ru';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls' data-code={list.length}>
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>{
          list.map(item =>
              <div key={item.code} className='List-item'>
                <div className={'Item' + (item.selected  ? ' Item_selected' : '')}
                     onClick={() => store.selectItem(item.code)}>
                  <div className='Item-code'>{item.code}</div>
                  <div className='Item-title'>{item.title}</div>
                  <div className='Item-text'>
                      {item.count === 0 ? '' :
                          `Выделяли  ${plural(item.count, '%d раз', '%d раза', '%d раз' )} `}
                  </div>
                  <div className='Item-actions'>
                    <button onClick={() => store.deleteItem(item.code)}>
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
