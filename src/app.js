import React from 'react';
import './styles.css';

function App({ store }) {
  const { list, selectedIds, clickCounts } = store.getState();

  const SingleSelectList = ({ items }) => {
    const handleItemClick = (itemCode, event) => {
      const ctrlPressed = event.ctrlKey || event.metaKey;
      const isCurrentlySelected = selectedIds.has(itemCode);

      if (ctrlPressed) {
        store.toggleSelection(itemCode, !isCurrentlySelected);
      } else {
        if (isCurrentlySelected) {
          store.toggleSelection(itemCode, false);
        } else {
          const newSelectedIds = new Set();
          newSelectedIds.add(itemCode);
          store.setState({
            ...store.getState(),
            selectedIds: newSelectedIds,
            clickCounts: new Map(store.getState().clickCounts).set(
              itemCode,
              (clickCounts.get(itemCode) || 0) + 1,
            ),
          });
        }
      }
    };

    return (
      <div className="List">
        {items.map(item => (
          <div key={item.code} className="List-item">
            <div
              className={`Item ${selectedIds.has(item.code) ? 'Item_selected' : ''}`}
              onClick={event => handleItemClick(item.code, event)}
            >
              <div className="Item-code">{item.code}</div>
              <div className="Item-title">
                {item.title}
                {clickCounts.get(item.code) > 0 && (
                  <div className="Item-count">
                    | Выделяли {clickCounts.get(item.code)} раз
                    {clickCounts.get(item.code) > 1 && clickCounts.get(item.code) < 5 ? 'а' : ''}
                  </div>
                )}
              </div>

              <div className="Item-actions">
                <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
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
        <SingleSelectList items={list} />
      </div>
    </div>
  );
}

export default App;
