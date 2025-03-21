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

  // Обработчик клика по элементу списка
  const handleItemClick = (code, event) => {
    const isCtrlPressed = event.ctrlKey || event.metaKey; // Проверяем, нажата ли Ctrl/Cmd
    store.selectItem(code, isCtrlPressed); // Передаём флаг в store
  };

  /**
   * Возвращение правильной формы слова "раз" в зависимости от числа / числительного
   * @param count {number} Количество выделений
   * @returns {string} Правильная форма слова "раз"
   */
  function getTimesWord(count) {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastDigit >= 2 && lastDigit <= 4 && !(lastTwoDigits >= 12 && lastTwoDigits <= 14))
      return 'раза';

    return 'раз';
  }

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-container">
        <div className="App-controls">
          <button className="App-add" onClick={() => store.addItem()}>
            Добавить
          </button>
        </div>
        <div className="App-center">
          <div className="List">
            {list.map(item => (
              <div key={item.code} className="List-item">
                <div
                  className={'Item' + (item.selected ? ' Item_selected' : '')}
                  onClick={e => handleItemClick(item.code, e)} // Использование handleItemClick
                >
                  <div className="Item-code">{item.code}</div>
                  <div className="Item-title">
                    {item.title}
                    <span className="Item-selection">
                      {item.selectionCount > 0 &&
                        ` | Выделяли ${item.selectionCount} ${getTimesWord(item.selectionCount)}`}
                    </span>
                  </div>
                  <div className="Item-actions">
                    <button
                      className="Item-remove"
                      onClick={e => {
                        e.stopPropagation(); // Предотвращение всплытие события
                        store.deleteItem(item.code);
                      }}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
