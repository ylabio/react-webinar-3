import React, { useState } from 'react';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const list = store.getState().list;

  const handlingSelectItem = (code) => {
    if (code === selectedItem) {
      store.clearSelectedItems();
      setSelectedItem(null);
    } else {
      store.clearSelectedItems();
      store.selectItem(code);
      setSelectedItem(code);
    }
  };

  const renderTittle = (item) => {
    const { completedSelectionNumber, title } = item;
    const stringCompletedSelection = String(completedSelectionNumber);
    const isFirstNumberNonOne = stringCompletedSelection[stringCompletedSelection.length - 2] != 1;
    const lastNumber = Number(stringCompletedSelection[stringCompletedSelection.length - 1]);

    switch (true) {
      case !completedSelectionNumber:
        return `${title}`;

      case lastNumber === 2 && isFirstNumberNonOne:
      case lastNumber === 3 && isFirstNumberNonOne:
      case lastNumber === 4 && isFirstNumberNonOne:
        return `${title} ${`| Выделяли ${completedSelectionNumber} разa`}`;

      default:
        return `${title} ${`| Выделяли ${completedSelectionNumber} раз`}`;
    }
  };


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
                onClick={() => handlingSelectItem(item.code)}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>
                  {renderTittle(item)}
                </div>
                <div className='Item-actions'>
                  <button onClick={(e) => { e.stopPropagation(); store.deleteItem(item.code); }}>
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
