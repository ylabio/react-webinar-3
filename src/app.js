import React from 'react';

import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const  { list } = store.getState();

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>

      <div className='App-controls'>
        <button onClick={() => store.addItem()}>
          Добавить
        </button>
      </div>

      <div className='App-center'>
        <div className='List'>
          {
            list.map((item) => {
              const { code } = item

              return (
                <div
                  key={code}
                  className='List-item'
                >
                  <div
                    className={getClassName(item)}
                    onClick={() => store.selectItem(code)}
                  >
                    <div className='Item-code'>
                      {code}
                    </div>
                      <div className='Item-title'>
                        {getTitle(item)}
                      </div>

                      <div className='Item-actions'>
                          <button onClick={() => store.deleteItem(code)}>
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

/**
 * Функция формирует заголовок элемента списка с учетом количества выделений.
 * @param item {Object}  - Объект элемента списка.
 * @param item.title {string} Заголовок элемента списка.
 * @param item.selectedCount {number}  Количество раз, которое элемент был выделен.
 * @returns {string}
 */

function getTitle({ title, selectedCount }) {
  const countText = selectedCount ? ` | Выделяли ${selectedCount} раз` : ''

  return title + countText
}

/**
 * Функция определяет класс элемента списка в зависимости от его выделения.
 * @param item {Object} Объект элемента списка.
 * @param item.selected{boolean} - Признак выделения элемента.
 * @returns {string} - Класс элемента списка.
 */

function getClassName({ selected }) {
  const selector = selected ? ' Item_selected' : ''

  return 'Item' + selector
}

export default App;
