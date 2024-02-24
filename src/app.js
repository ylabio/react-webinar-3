import React from 'react';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
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
                   onClick={() => store.selectItem(item.code)}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>
                  {item.selectionQuantity ? `${item.title} | Выделяли ${item.selectionQuantity} раз${
                                              //добавлена проверка остатка от деления на 100, фикс неправильного склонения
                                              (item.selectionQuantity % 100 < 10 || item.selectionQuantity % 100 > 20)
                                              && ([2,3,4].findIndex(el => el === item.selectionQuantity % 10) !== -1) ? 'а' : ''}`
                                          : item.title}
                </div>
                <div className='Item-actions'>
                  <button onClick={(ev) => {
                    store.deleteItem(item.code);
                    ev.stopPropagation(); //остановка цепочки событий click, фикс снятия выделения при удалении записи
                    }}>
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
