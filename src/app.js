import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

function App({ store }) {
  const list = store.getState().list;

  /**
   * Функция для склонения слова "раз" в зависимости от числа
   * @param num {number} Число
   * @returns {string} Строка с числом и склоненной формой слова "раз"
   */
  function formatSelectedCount(num) {
    const cases = [2, 0, 1, 1, 1, 2];
    return ` | Выделяли ${num} ${
      ['раз', 'раза', 'раз'][num % 100 > 4 && num % 100 < 20 ? 2 : cases[Math.min(num % 10, 5)]]
    }`;
  }

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
          {list.map((item) => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => {
                  if (!item.selected) {
                    store.setState({
                      ...store.getState(),
                      list: store.getState().list.map((i) => {
                        if (i.code === item.code) {
                          i.selectedCount = i.selectedCount ? i.selectedCount + 1 : 1;
                        }
                        return i;
                      }),
                    });
                  }
                  store.selectItem(item.code);
                }}>
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  <div className={'Item-title-text' + (item.selected ? ' Item_selected' : '')}>
                    {item.title}
                  </div>
                  <div className="Item-selected-count">
                    {item.selectedCount && formatSelectedCount(item.selectedCount)}
                  </div>
                </div>
                <div className="Item-actions">
                  <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
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
