import React from 'react';
import './styles.css';

/**
 * Плюрализация
 * @param number {number} Число, сколько раз выделяли элемент
 * @returns {string} Плюрализированная строка
 */

const pluralize = (number) => {
  let dividerTen = number % 10;
  let dividerHundred = number % 100;

  if (dividerTen >= 2 && dividerTen <= 4 && (dividerHundred < 10 || dividerHundred >= 20)) {
    return `${number} раза`;
  }

  return `${number} раз`;
}

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */

function App({store}) {

  const list = store.getState().list;

  const handleDelete = (evt, code) => {
    evt.stopPropagation();
    store.deleteItem(code)
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
                <div className='Item-title'>{item.title} {store.getSelectedCount(item.code) > 0 && `| Выделяли ${pluralize(store.getSelectedCount(item.code))}`}</div>
                <div className='Item-actions'>
                  <button onClick={(evt) => handleDelete(evt, item.code)}>
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