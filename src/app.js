import React from 'react';
import {getDeclension} from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  const highlightHandler = (code, e) => {
    store.selectItem(code);
  }

  const deleteHandler = (code, e) => {
    e.stopPropagation();
    store.deleteItem(code);
  }

  const addHandler = () => {
    store.addItem();
  }

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={addHandler}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>{
          list.map(item =>
            <div key={item.code} className='List-item'>
              <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                  onClick={(e) => highlightHandler(item.code, e)}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>
                  {item.title}
                  {item.highlightCounter > 0 && ` | Выделяли ${item.highlightCounter} ${getDeclension(item.highlightCounter, ["раза", "раз"])}`}
                </div>
                <div className='Item-actions'>
                  <button onClick={(e) => deleteHandler(item.code, e)}>
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
