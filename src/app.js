import React from 'react';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  // Функция для плюрализации слова Раз. Исключения для 12,13 и 14
  function getPluralForm(count) {
    if (count % 10 === 1 && count % 100 !== 11) {
      return 'раз';
    }
    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
      return 'раза';
    }
    return 'раз';
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
        {list.map(item => {
            let selectCount = store.selectCounts.get(item.code) || 0;
            const isOdd = item.code % 2 !== 0;

            return (
              <div key={item.code} className={`List-item${isOdd ? ' Item-odd' : ''}`}>
                <div
                  className={'Item' + (item.selected ? ' Item_selected' : '')}
                  onClick={(event) => store.selectItem(item.code, event)}
                >
                  <div className="Item-code">{item.code}</div>
                  <div className="Item-title">{item.title}</div>

                    <div className="Item-count">
                    {selectCount > 0 && (
                        <>| Выделяли {selectCount} {getPluralForm(selectCount)}</>

                    )}

                      </div>

                  <div className="Item-actions">
                    <button 
                    onClick={(event) => {
                      // Остановка пропагации, чтобы не сбрасывать выделения
                      event.stopPropagation(); 
                      store.deleteItem(item.code)}}>
                        Удалить
                    </button>
                    
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
