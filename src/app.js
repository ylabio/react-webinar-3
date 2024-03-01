import React from 'react';
import {createElement} from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  const timesByCount = times => {
    return times + " " + ((times < 12 || times.toString().substring(times.toString().length - 2, times.toString().length - 1) !== "1") && ["2", "3", "4"].includes(times.toString().substring(times.toString().length - 1)) ? "раза" : "раз");
  }

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
                   onClick={() => store.selectItem(item.code)}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>{item.title + (item.selections > 0 ? ` | Выделяли ${timesByCount(item.selections)}` : '')}</div>
                <div className='Item-actions'>
                  <button onClick={event => { event.stopPropagation(); store.deleteItem(item.code); }}>
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
