import React, { useState, useEffect } from 'react';
import './styles.css';

// Функция для плюрализации слова "раз"
const pluralizeTimes = (count) => {
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'раз';
  } else if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 10 || count % 100 >= 20)
  ) {
    return 'раза';
  } else {
    return 'раз';
  }
};

function App({ store }) {
  const [list, setList] = useState(store.getState().list);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setList(store.getState().list);
    });
    return () => unsubscribe();
  }, [store]);

  const handleSelect = (code, event) => {
    console.log('handleSelect called for code:', code, 'ctrlKey:', event.ctrlKey || event.metaKey);
    store.selectItem(code, event.ctrlKey || event.metaKey);
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
          {list.map((item) => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={event => handleSelect(item.code, event)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  {item.title}
                  {item.selectCount > 0 && (
                    <>
                      <span className="Item-divider"> | </span>
                      <span className="Item-select-count">
                        Выделяли {item.selectCount} {pluralizeTimes(item.selectCount)}
                      </span>
                    </>
                  )}
                </div>
                <div className="Item-actions">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
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
  );
}

export default App;