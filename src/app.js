import React from 'react';
import {pluralize} from './utils.js';
import './styles.css';

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
      <div className='App-controls'>
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>{
          list.map(item =>
            <div key={item.code} className='List-item'>
              <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                   onClick={({target}) => {
                    // Делаем проверку, чтобы выделение не сбрасывалось,
                    // когда мы кликаем по кнопке "удалить"
                    if (!target.matches('button')) {
                      store.selectItem(item.code)}
                    }
                  }>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>{item.title}
                  {item.selectedCount > 0 &&
                    <span> | Выделяли {item.selectedCount} {pluralize(item.selectedCount, ['раз', 'раза', 'раз'])} </span>}
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
