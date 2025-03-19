import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  /**
   * Обработчик клика по элементу
   * @param {Event} e - событие клика
   * @param {Number} code - код элемента
   */
  const handleItemClick = (e, code) => {
    const isMultiSelect = e.ctrlKey || e.metaKey;
    store.selectItem(code, isMultiSelect);

    if (isMultiSelect) {
      e.preventDefault();
    }
  };

  /**
   * Обработчик клика по кнопке удаления
   * @param {Event} e - событие клика
   * @param {Number} code - код элемента
   */
  const handleDeleteClick = (e, code) => {
    e.stopPropagation();
    store.deleteItem(code);
  };

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={e => handleItemClick(e, item.code)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title}</div>
                <div className="Item-actions">
                  <button onClick={e => handleDeleteClick(e, item.code)}>Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
