import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function List({ items, empty = 'Список пуст', renderItem }) {
  const cn = bem('List');

  return (
    <>
      {!items || items.length === 0 ? (
        <span>{empty}</span>
      ) : (
        <ul className={cn()}>
          {items.map(item => (
            <li key={item.code} className={cn('item')}>
              {renderItem(item)}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

List.propTypes = {
  items: PropTypes.array,
  renderItem: PropTypes.func,
  empty: PropTypes.string,
};

export default React.memo(List);
