import React, { useState, useLayoutEffect, useRef } from 'react';
import { getWordEnding } from './utils.js';

/**
 * Компонент элемента списка
 * @param item {Object}
 * @returns {React.ReactElement}
 */
function Item({ item, onClick, onDelete }) {
  const titleRef = useRef(null);
  const countRef = useRef(null);
  const [showSeparator, setShowSeparator] = useState(false);

  const updateSeparatorVisibility = () => {
    if (titleRef.current && countRef.current) {
      const titleRect = titleRef.current.getBoundingClientRect();
      const countRect = countRef.current.getBoundingClientRect();
      setShowSeparator(titleRect.top === countRect.top);
    }
  };

  useLayoutEffect(() => {
    updateSeparatorVisibility();
  }, [item.selectCount]);

  return (
    <div className={'Item' + (item.selected ? ' Item_selected' : '')} onClick={onClick}>
      <div className="Item-code">{item.code}</div>
      <div className="Item-info">
        <div ref={titleRef} className="Item-title">
          {item.title}
        </div>
        {item.selectCount > 0 && (
          <>
            {showSeparator && <span className="separator"> | </span>}
            <div ref={countRef} className="Item-selectCount">
              Выделяли {item.selectCount}&nbsp;{getWordEnding(item.selectCount)}
            </div>
          </>
        )}
      </div>
      <div className="Item-actions">
        <button onClick={onDelete}>Удалить</button>
      </div>
    </div>
  );
}

export default Item;
