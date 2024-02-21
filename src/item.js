import React, { useState } from 'react';

function Item({ item, onItemClick, onDelete }) {
  const [showSelectionCount, setShowSelectionCount] = useState(false);

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
          {item.title} {showSelectionCount && `| Выделяли ${item.selectionCount} раз`}
        </div>
        <div className='Item-actions'>
          <button onClick={() => onDelete(item.code)}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

export default Item;