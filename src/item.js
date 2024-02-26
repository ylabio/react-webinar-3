import React, { useState } from 'react';

function Item({ item, onItemClick, onDelete }) {
  const [showSelectionCount, setShowSelectionCount] = useState(false);

  const pluralize = (count, words) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return words[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[Math.min(count % 10, 5)]];
  };

  return (
    <div className='List-item'>
      <div
        className={'Item' + (item.selected ? ' Item_selected' : '')}
        onClick={() => {
          setShowSelectionCount(true);
          onItemClick(item.code);
        }}
      >
        <div className='Item-code'>{item.code}</div>
        <div className='Item-title'>
          {item.title} {showSelectionCount && `| Выделяли ${item.selectionCount} ${pluralize(item.selectionCount, ['раз', 'раза', 'раз'])}`}
        </div>
        <div className='Item-actions'>
        <button onClick={() => onDelete(item.code)}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

export default Item;