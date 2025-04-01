import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function List({ items, renderItem, className }) {
  const cn = bem('List');
  
  return (
    <ul className={cn(null, [className])}>      
      {items.map((item) => (
        <li key={item.code} className={cn('item')}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderItem: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default React.memo(List);
