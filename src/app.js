import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */

const getCorrectSpelling = declensions => num => {
  const cases = [2, 0, 1, 1, 1, 2];
  return declensions[num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]];
};

const getWordTimesSpelling = getCorrectSpelling(['раз', 'раза', 'раз']);

function App({ store }) {
  const list = store.getState().list;

  const handleItemClick = (event, itemCode) => {
    if (event.target.closest('.Item-actions')) {
      return;
    }

    if (event.metaKey || event.ctrlKey) {
      store.selectItem(itemCode, true);
    } else {
      store.selectItem(itemCode);
    }
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
                onClick={event => handleItemClick(event, item.code)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  <span>{item.title}</span>
                  {!!item.numberOfSelections && (
                    <>
                      {' '}
                      | Выделяли {item.numberOfSelections}{' '}
                      {getWordTimesSpelling(item.numberOfSelections)}
                    </>
                  )}
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
