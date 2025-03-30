import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function List({ list, renderItem = () => {} }) {
  const cn = bem('List');

  return (
    <ul className={cn()}>
      {list.map(item => (
        <li key={item.code} className={cn('item')}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  renderItem: PropTypes.func,
};

export default React.memo(List);
