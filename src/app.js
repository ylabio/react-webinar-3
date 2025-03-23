import React, { useState, useEffect } from 'react';
import './styles.css';

function App({ store }) {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });
    return () => unsubscribe();
  }, [store]);

  const SingleSelectList = ({ items }) => {
    const handleItemClick = (item, event) => {
      const ctrlPressed = event.ctrlKey || event.metaKey;
      const isCurrentlySelected = state.selectedIds.has(item.code);

      const newSelectedIds = new Set(state.selectedIds);

      if (ctrlPressed) {
        if (isCurrentlySelected) {
          newSelectedIds.delete(item.code);
        } else {
          newSelectedIds.add(item.code);
        }
      } else {
        if (!isCurrentlySelected) {
          newSelectedIds.clear();
          newSelectedIds.add(item.code);
        } else {
          newSelectedIds.delete(item.code);
        }
      }

      const newClickCounts = new Map(state.clickCounts);
      if (newSelectedIds.has(item.code) && !isCurrentlySelected) {
        newClickCounts.set(item.code, (state.clickCounts.get(item.code) || 0) + 1);
      }

      store.setState({
        selectedIds: newSelectedIds,
        clickCounts: newClickCounts,
      });
    };

    const handleDelete = (itemCode, event) => {
      event.stopPropagation();
      store.deleteItem(itemCode);
    };

    return (
      <div className="List">
        {items.map(item => (
          <div key={item.code} className="List-item">
            <div
              className={`Item ${state.selectedIds.has(item.code) ? 'Item_selected' : ''}`}
              onClick={event => handleItemClick(item, event)}
            >
              <div className="Item-code">{item.code}</div>
              <div className="Item-title">{item.title}</div>
              {state.clickCounts.get(item.code) > 0 && (
                <div className="Item-count">
                  &nbsp;|&nbsp;Выделяли {state.clickCounts.get(item.code)} раз
                  {state.clickCounts.get(item.code) > 1 ? 'а' : ''}
                </div>
              )}
              <div className="Item-actions">
                <button onClick={event => handleDelete(item.code, event)}>Удалить</button>
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
        <SingleSelectList items={state.list} />
      </div>
    </div>
  );
}

export default App;
