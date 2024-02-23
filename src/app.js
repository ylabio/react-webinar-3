import React from 'react';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  // Получить префикс с плюрализацией
  // Если число выделений = 0, то вернёт пустую строку
  const getPrefix = (selectCount) => {
    const pluralizeNums = ['2', '3', '4'] 
    
    let ending = ''

    if (selectCount < 10 || selectCount > 20) {
      ending = pluralizeNums.includes(selectCount.toString().at(-1)) ? 'а' : '' 
    } 

    const prefix = selectCount ? ` | Выделяли ${selectCount} раз${ending}` : '';
    
    return prefix;
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
          list.map(item => {
            return (
            <div key={item.code} className='List-item'>
              <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                  onClick={() => store.selectItem(item.code)}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>{item.title + getPrefix(item.selectCount)}</div>
                <div className='Item-actions'>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    store.deleteItem(item.code);
                  } }>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
            )
          })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
