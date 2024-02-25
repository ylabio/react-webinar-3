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

  const pluralize = (counter) => {
    if (counter % 10 === 1 && counter % 100 !== 11) {
      return "раз";
    } else if((counter % 10 >= 2 && counter % 10 <= 4 && (counter % 100 < 10 || counter % 100 >= 20))) {
      return "раза";
    } else {
      return "раз";
    }
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
                {/* Отрисовываем фразу, если счетчик больше 0 */}
                <div className='Item-title'>{item.title}{item.counter > 0 ? ` | Выделяли ${item.counter} ${pluralize(item.counter)}` : ''}</div>
                <div className='Item-actions'>
                  <button onClick={(e) => store.deleteItem(e, item.code)}>
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
