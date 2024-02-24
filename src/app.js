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

  // Функция для определения варианта слова "раз" в зависимости от числа.
  function determinateEnd(number, one, several) {
    const numberOneSymbol = number.toString().slice(-1);
    const numberTwoSymbol = number.toString().slice(-2); // переменная добавлена для обработки исключения 12, 13 и 14.
    if ( numberOneSymbol >= 2 && numberOneSymbol <= 4 && numberTwoSymbol != 12 && numberTwoSymbol != 13 && numberTwoSymbol != 14) {
      return several;
    }
    return one;
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
              <div className={'Item' + (item.selected ? ' Item_selected' : '')} onClick={() => store.selectItem(item.code)}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>{item.title}{item.value ? ` | Выделяли ${item.value} ${determinateEnd(item.value, 'раз', 'раза')}` : null}</div>
                <div className='Item-actions'>
                 {/* "Не сбрасывай выделение при удалении." - для решения этой задачи, для предотвращения всплытия клика от дочернего элемента к родителю, добавлен stopPropagation.  */}
                  <button onClick={(e) => {e.stopPropagation(); store.deleteItem(item.code)}}> 
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
