import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;

  const getSelectedPhrase = (selectCount) => {
    const exeptionArr = [12, 13, 14];
    const arr = ['2', '3', '4'];
    const number = [...selectCount + ''].slice(-1)[0];
    return (arr.includes(number) && !exeptionArr.includes(selectCount))
      ? ` | Выделяли ${selectCount} раза`
      : ` | Выделяли ${selectCount} раз`
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
                <div className='Item-title'>{item.selectCount ? item.title + '' + getSelectedPhrase(item.selectCount) : item.title}</div>
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
